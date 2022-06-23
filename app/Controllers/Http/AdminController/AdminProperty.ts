import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Property from 'App/Models/Property'

export default class AdminsController {
  async index({ view }: HttpContextContract) {
    const properties = await Property.all()
    return view.render('admin/property/index', {
      properties,
    })
  }

  newView({ view }: HttpContextContract) {
    return view.render('admin/property/new')
  }

  addNew({ request, session, response }: HttpContextContract) {
    session.flash({ success: 'Created Success' })
    const property = new Property()
    property.merge(request.all()).save()
    return response.redirect().toRoute('admin')
  }

  async edit({ view, params }: HttpContextContract) {
    const property = await Property.findOrFail(params.id)
    return view.render('admin/property/edit', {
      property,
    })
  }
}
