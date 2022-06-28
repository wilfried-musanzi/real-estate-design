import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  loginView({ view }: HttpContextContract) {
    return view.render('auth/login')
  }
}
