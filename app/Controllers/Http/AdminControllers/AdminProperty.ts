import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Property from 'App/Models/Property'
import Database from '@ioc:Adonis/Lucid/Database'

export default class AdminProperty {
  propertySchema = schema.create({
    title: schema.string([rules.minLength(5), rules.maxLength(15)]),
    town: schema.string([rules.minLength(3)]),
    price: schema.number([rules.range(400, 500)]),
    surface: schema.number([rules.range(40, 100)]),
    description: schema.string([rules.minLength(10), rules.maxLength(25)]),
    reserved: schema.boolean.nullableAndOptional(),
  })

  messages = {
    'title.minLength': 'Titre inferieur a 5',
    'title.maxLength': 'Titre superieur a 15',
    'town.minLength': 'Ville inferieur a 3',
    'price.range': 'Le prix doit etre entre 400$ et 500$',
    'surface.range': 'La surface doit etre entre 40m2 et 100m2',
    'description.minLength': 'La description inferieur a 10',
    'description.maxLength': 'La description superieur a 25',
    'required': 'Le champ ne peut pas etre vide !',
  }

  async index({ view, request }: HttpContextContract) {
    const limit = 2
    const page = request.input('page', 1)
    const properties = await Database.from(Property.table).paginate(page, limit)
    properties.baseUrl('/admin/property')
    return view.render('admin/property/index', {
      properties,
      controller: 'adminPropertyController',
    })
  }

  async createView({ view }: HttpContextContract) {
    const property = new Property()
    return view.render('admin/property/new', {
      property,
      controller: 'adminPropertyController',
    })
  }

  async create({ params, request, session, response }: HttpContextContract) {
    await this.handleRequest(params, request)
    session.flash({ success: 'Created Success' })
    return response.redirect().toRoute('admin-property.index', {
      controller: 'adminPropertyController',
    })
  }

  async updateView({ view, params }: HttpContextContract) {
    const property = await Property.findOrFail(params.id)
    return view.render('admin/property/edit', {
      property,
      controller: 'adminPropertyController',
    })
  }

  async update({ params, request, session, response }: HttpContextContract) {
    await this.handleRequest(params, request)
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

  async handleRequest(
    params: HttpContextContract['params'],
    request: HttpContextContract['request']
  ) {
    const id = params.id
    const property = id ? await Property.findOrFail(id) : new Property()
    const payload = await request.validate({
      schema: this.propertySchema,
      messages: this.messages,
    })
    property.merge({ ...payload, reserved: payload.reserved || false }).save()
  }
}
