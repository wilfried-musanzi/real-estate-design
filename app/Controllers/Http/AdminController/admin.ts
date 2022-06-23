import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdminsController {
  index({ view }: HttpContextContract) {
    return view.render('admin/properties/index')
  }
}
