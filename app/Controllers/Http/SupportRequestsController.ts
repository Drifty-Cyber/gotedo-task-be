import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SupportRequestsController {
  public async submitRequest({ request, response }: HttpContextContract) {
    const { firstName, lastName, emailAddress, supportMessageTitle, supportMessageText } =
      request.body()
  }
}
