import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SupportRequestValidorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    firstName: schema.string({ trim: true }),
    lastName: schema.string({ trim: true }),
    emailAddress: schema.string({ trim: true }), //create rules
    supportMessageTitle: schema.string({ trim: true }),
    supportMessageText: schema.string({ trim: true }),
    // file: schema.string({ trim: true }),
  })

  public messages: CustomMessages = {
    'firstName.required': 'First Name is required',
    'lastName.required': 'Last Name is required',
    'emailAddress.required': 'Email Address is required',
    'supportMessageTitle.required': 'Request must have a title',
    'supportMessageText.required': 'Request Message is required',
    // 'file.required': 'File URL is required',
  }
}
