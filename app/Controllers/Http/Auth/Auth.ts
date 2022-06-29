import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/LoginValidator'

export default class AuthController {
  loginView({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  async login({ request, auth, response, session }: HttpContextContract) {
    const payload = await request.validate(LoginValidator)
    await auth.use('web').attempt(payload.email, payload.password)
    session.flash({ success: 'Connected Success' })
    return response.redirect().toRoute('admin')
  }

  async logout({ auth, response, session }: HttpContextContract) {
    await auth.use('web').logout()
    session.flash({ success: 'Logged out !' })
    response.redirect().toRoute('login')
  }
}
