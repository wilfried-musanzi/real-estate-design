import Municipality from 'App/Models/Municipality'
import Database from '@ioc:Adonis/Lucid/Database'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MunicipalityValidator from 'App/Validators/MunicipalityValidator'

export default class AdminCategory {
  async index({ view }: HttpContextContract) {
    const municipalities = await Database.from(Municipality.table)
    return view.render('admin/municipality/index', {
      municipalities,
      controller: 'adminMunicipalityController',
    })
  }

  view({ view }: HttpContextContract) {
    return view.render('admin/category/new', {
      controller: 'adminMunicipalityController',
    })
  }

  async addNew({ request, session, response }: HttpContextContract) {
    const payload = await request.validate(MunicipalityValidator)
    await Municipality.create(payload)
    session.flash({ success: 'The municipality has been created !' })
    return response.redirect().toRoute('municipality.index', {
      controller: 'adminMunicipalityController',
    })
  }

  async show({ view, params }: HttpContextContract) {
    const municipality = await Municipality.findOrFail(params.id)
    return view.render('admin/municipality/edit', {
      municipality,
      controller: 'adminMunicipalityController',
    })
  }

  async edit({ params, request, session, response }: HttpContextContract) {
    const payload = await request.validate(MunicipalityValidator)
    const property = await Municipality.findOrFail(params.id)
    property.merge(payload).save()
    session.flash({ success: 'The municipality has been updated !' })
    return response.redirect().toRoute('municipality.index', {
      controller: 'adminMunicipalityController',
    })
  }

  async delete({ params, session, response }: HttpContextContract) {
    const property = await Municipality.findOrFail(params.id)
    property.delete()
    session.flash({ success: 'The municipality has been deleted !' })
    return response.redirect().toRoute('municipality.index', {
      controller: 'adminMunicipalityController',
    })
  }
}
