import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Category from 'App/Models/Category'

export default class AdminCategory {
  async index({ view }: HttpContextContract) {
    const categories = await Category.query().orderBy('id', 'asc')
    return view.render('admin/category/index', {
      categories,
      controller: 'adminCategoryController',
    })
  }

  view({ view }: HttpContextContract) {
    return view.render('admin/category/new', {
      controller: 'adminCategoryController',
    })
  }

  async addNew({ request, session, response }: HttpContextContract) {
    const categorySchema = schema.create({
      name: schema.string([rules.minLength(4)]),
    })

    const payload = await request.validate({
      schema: categorySchema,
    })

    await Category.create(payload)
    session.flash({ success: 'Created Success' })
    return response.redirect().toRoute('admin-category.index', {
      controller: 'adminCategoryController',
    })
  }

  async show({ view, params }: HttpContextContract) {
    const category = await Category.findOrFail(params.id)
    return view.render('admin/category/edit', {
      category,
      controller: 'adminCategoryController',
    })
  }

  async edit({ params, request, session, response }: HttpContextContract) {
    const categorySchema = schema.create({
      name: schema.string([rules.minLength(4)]),
    })
    const payload = await request.validate({
      schema: categorySchema,
    })
    const property = await Category.findOrFail(params.id)
    property.merge(payload).save()
    session.flash({ success: 'Updated Success' })
    return response.redirect().toRoute('admin-category.index', {
      controller: 'adminCategoryController',
    })
  }

  async delete({ params, session, response }: HttpContextContract) {
    const property = await Category.findOrFail(params.id)
    property.delete()
    session.flash({ success: 'Delete Success' })
    return response.redirect().toRoute('admin-category.index', {
      controller: 'adminCategoryController',
    })
  }
}
