import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Property from 'App/Models/Property'

export default class AdminProperty {
  propertySchema = schema.create({
    title: schema.string([rules.minLength(5), rules.maxLength(15)]),
    town: schema.string([rules.minLength(3)]),
    price: schema.number([rules.range(400, 500)]),
    surface: schema.number([rules.range(40, 100)]),
    description: schema.string([rules.minLength(10), rules.maxLength(25)]),
  })

  messages = {
    'title.minLength': 'Titre inferieur a 5',
    'title.maxLength': 'Titre superieur a 15',
    'town.minLength': 'Ville inferieur a 3',
    'price.range': 'Le prix doit etre entre 400$ et 500$',
    'surface.range': 'La surface doit etre entre 40m2 et 100m2',
    'description.minLength': 'La description inferieur a 10',
    'description.maxLength': 'La description superieur a 25',
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
    const payload = await request.validate({
      schema: this.propertySchema,
      messages: this.messages,
    })
    await Property.create(payload)
    session.flash({ success: 'Created Success' })
    return response.redirect().toRoute('admin-property.index', {
      controller: 'adminPropertyController',
    })
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
    const payload = await request.validate({
      schema: this.propertySchema,
      messages: this.messages,
    })
    property.merge(payload).save()
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
