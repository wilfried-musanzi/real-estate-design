import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SecureBackend {
  public async handle({ bouncer, response }: HttpContextContract, next: () => Promise<void>) {
    try {
      await bouncer.authorize('accedToAdminPanel')
    } catch {
      return response.redirect().toRoute('home')
    }
    await next()
  }
}
