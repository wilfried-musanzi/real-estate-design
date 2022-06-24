import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import Property from 'App/Models/Property'

export default class AdminProperty {
  async dashboard({ view }: HttpContextContract) {
    const properties = await Property.query().count('id')
    let [{ $extras: extraProp }] = properties
    const { count: countProp } = extraProp
    const category = await Category.query().count('id')
    let [{ $extras: extraCat }] = category
    const { count: countCat } = extraCat
    return view.render('admin/dashboard', {
      countProp,
      countCat,
      controller: 'adminDashboard',
    })
  }

  async index({ view }: HttpContextContract) {
    const properties = await Property.query().orderBy('id', 'asc')
    return view.render('admin/property/index', {
      properties,
      controller: 'adminPropertyController',
    })
  }

  view({ view }: HttpContextContract) {
    return view.render('admin/property/new', {
      controller: 'adminPropertyController',
    })
  }

  async addNew({ request, session, response }: HttpContextContract) {
    const data = request.all()
    const property = await Property.create(data)
    if (property.$isPersisted) {
      session.flash({ success: 'Created Success' })
      return response.redirect().toRoute('admin-property.index', {
        controller: 'adminPropertyController',
      })
    }
  }

  async show({ view, params }: HttpContextContract) {
    const property = await Property.findOrFail(params.id)
    return view.render('admin/property/edit', {
      property,
      controller: 'adminPropertyController',
    })
  }

  async edit({ params, request, session, response }: HttpContextContract) {
    const property = await Property.findOrFail(params.id)
    const data = request.all()
    property.merge(data).save()
    session.flash({ success: 'Updated Success' })
    return response.redirect().toRoute('admin-property.index', {
      controller: 'adminPropertyController',
    })
  }

  async delete({ params, session, response }: HttpContextContract) {
    const property = await Property.findOrFail(params.id)
    property.delete()
    session.flash({ success: 'Delete Success' })
    return response.redirect().toRoute('admin-property.index', {
      controller: 'adminPropertyController',
    })
  }
}
