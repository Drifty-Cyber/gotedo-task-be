import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import SupportRequest from 'App/Models/SupportRequest'

export default class extends BaseSchema {
  protected tableName = 'support_request_seeders'

  public async up() {
    await SupportRequest.createMany([
      {
        supportMessageTitle: 'Bad Mouse',
        supportMessageText: 'My Mouse is bad',
      },
      {
        supportMessageTitle: 'Bad screen',
        supportMessageText: 'My screen is bad',
      },
      {
        supportMessageTitle: 'Bad Keyboard',
        supportMessageText: 'My keyboard is bad',
      },
      {
        supportMessageTitle: 'Bad Battery',
        supportMessageText: 'My battery is bad',
      },
    ])
  }

  public async down() {
    await SupportRequest.query().delete()
  }
}
