import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'

export default class LoginValidator {
  public schema = schema.create({
    email: schema.string([rules.email()]),
    password: schema.string(),
  })

  public messages: CustomMessages = {}
}
