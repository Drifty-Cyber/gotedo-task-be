import { test } from '@japa/runner'

import supertest from 'supertest'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'

test('create request', async ({ client }) => {
  let app: ApplicationContract

  const response = await supertest(app.container.use('Adonis/Core/HttpContext').app)
    .post('/create-support-request')
    .field('firstName', 'John')
    .field('lastName', 'Doe')
    .field('emailAddress', 'raphaelfadimu@gmail.com')
    .field('title', 'Bad Keyboard')
    .field('text', 'My Keyboard is bad')
    .attach('file', 'uploads/12337433.csv')

  response.assertStatus(201)
  response.assertBodyContains({
    status: 'Success',
    message: 'Created Support Request successfully',
  })
})
