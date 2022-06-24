import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
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
    const data = request.all()
    const property = await Category.create(data)
    if (property.$isPersisted) {
      session.flash({ success: 'Created Success' })
      return response.redirect().toRoute('admin-category.index', {
        controller: 'adminCategoryController',
      })
    }
  }

  async show({ view, params }: HttpContextContract) {
    const category = await Category.findOrFail(params.id)
    return view.render('admin/category/edit', {
      category,
      controller: 'adminCategoryController',
    })
  }

  async edit({ params, request, session, response }: HttpContextContract) {
    const property = await Category.findOrFail(params.id)
    const data = request.all()
    property.merge(data).save()
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
