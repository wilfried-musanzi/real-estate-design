import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'

export default class LoginValidator {
  public schema = schema.create({
    password: schema.string(),
    email: schema.string([rules.email()]),
  })

  public messages: CustomMessages = {}
}
