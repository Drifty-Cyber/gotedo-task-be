import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import uploadFile from 'App/Helpers/Upload'
import SupportRequest from 'App/Models/SupportRequest'
import User from 'App/Models/User'
import RequestValidator from 'App/Validators/RequestValidator'
import UserValidator from 'App/Validators/UserValidator'

export default class SupportRequestsController {
  public async submitRequest({ request, response }: HttpContextContract) {
    const supportFile = request.file('file', {
      size: '1',
      extnames: ['docx', 'xlsx', 'pdf', 'csv'],
    })
    const fileUrl = await uploadFile(supportFile)
    const validatedBody = await request.validate(RequestValidator)

    const { firstName, lastName, emailAddress, supportMessageTitle, supportMessageText } =
      validatedBody

    // Persist to 'User' table
    const user = await User.firstOrCreate(
      { emailAddress },
      { emailAddress, fullName: `${firstName} ${lastName}` }
    )

    // Persist to 'Support Request' table
    const userId = user.id

    const supportRequestPayload = {
      userId,
      supportMessageTitle,
      supportMessageText,
      fileUrl: fileUrl,
    }

    const supportRequest = await SupportRequest.create(supportRequestPayload)

    return response.created({
      status: 'Success',
      message: 'Created Support Request successfully',
      statusCode: 201,
      results: supportRequest,
    })
  }

  public async getUserRequests({ request, response }: HttpContextContract) {
    const validatedBody = await request.validate(UserValidator)

    const { emailAddress } = validatedBody

    const user = await User.query().where('emailAddress', emailAddress).firstOrFail()

    const requests = await SupportRequest.query().where('userId', user.id)

    return response.ok({
      status: 'Success',
      message: 'Fetched User requests successfully',
      statusCode: 201,
      results: requests,
    })
  }
}
