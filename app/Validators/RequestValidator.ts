import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RequestValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    firstName: schema.string({ trim: true }, [
      rules.alpha({
        allow: ['space', 'underscore', 'dash'],
      }),
    ]),
    lastName: schema.string({ trim: true }, [
      rules.alpha({
        allow: ['space', 'underscore', 'dash'],
      }),
    ]),
    emailAddress: schema.string([
      rules.email(),
      rules.normalizeEmail({
        allLowercase: true,
        gmailRemoveDots: true,
        gmailRemoveSubaddress: true,
      }),
      rules.maxLength(80),
    ]),
    supportMessageTitle: schema.string({ trim: true }),
    supportMessageText: schema.string({ trim: true }),
    fileUrl: schema.string.optional({ trim: true }),
  })

  public messages: CustomMessages = {
    'firstName.required': 'First Name is required',
    'firstName.alpha': 'First name should only contain alphabets.',
    'lastName.required': 'Last Name is required',
    'lastName.alpha': 'Last name should only contain alphabets.',
    'emailAddress.required': 'Email Address is required',
    'emailAddress.email': 'Email address must be a valid email address.',
    'supportMessageTitle.required': 'Request must have a title',
    'supportMessageText.required': 'Request Message is required',
    'fileUrl.required': 'File Url is required',
    // 'file.required': 'File URL is required',
  }
}
