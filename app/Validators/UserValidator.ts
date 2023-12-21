import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    emailAddress: schema.string([
      rules.email(),
      rules.normalizeEmail({
        allLowercase: true,
        gmailRemoveDots: true,
        gmailRemoveSubaddress: true,
      }),
      rules.maxLength(80),
    ]),
  })

  public messages: CustomMessages = {
    'emailAddress.required': 'Email Address is required',
    'emailAddress.email': 'Email address must be a valid email address.',
  }
}
