import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import uploadFile from 'App/Helpers/Upload'
import SupportRequest from 'App/Models/SupportRequest'
import User from 'App/Models/User'
import RequestValidator from 'App/Validators/RequestValidator'

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
      fileUrl,
    }

    const supportRequest = await SupportRequest.firstOrCreate({ userId }, supportRequestPayload)

    return response.ok({
      status: 'Success',
      message: 'Created Support Request successfully',
      statusCode: 201,
      results: supportRequest,
    })
  }
}
