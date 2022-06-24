import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class AdminCategory {
  async index({ view }: HttpContextContract) {
    const properties = await Category.query().orderBy('id', 'asc')
    return view.render('admin/property/index', {
      properties,
    })
  }
  view({ view }: HttpContextContract) {
    return view.render('admin/property/new')
  }

  async addNew({ request, session, response }: HttpContextContract) {
    const data = request.all()
    const property = await Category.create(data)
    if (property.$isPersisted) {
      session.flash({ success: 'Created Success' })
      return response.redirect().toRoute('admin')
    }
  }

  async show({ view, params }: HttpContextContract) {
    const property = await Category.findOrFail(params.id)
    return view.render('admin/property/edit', {
      property,
    })
  }

  async edit({ params, request, session, response }: HttpContextContract) {
    const property = await Category.findOrFail(params.id)
    const data = request.all()
    property.merge(data).save()
    session.flash({ success: 'Updated Success' })
    return response.redirect().toRoute('admin')
  }

  async delete({ params, session, response }: HttpContextContract) {
    const property = await Category.findOrFail(params.id)
    property.delete()
    session.flash({ success: 'Delete Success' })
    return response.redirect().toRoute('admin')
  }
}
