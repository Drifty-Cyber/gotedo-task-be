import { test } from '@japa/runner'

test('create request', async ({ client }) => {
  const response = await client.post('/create-support-request')

  response.assertStatus(201)
  response.assertBodyContains({
    status: 'Success',
    message: 'Created Support Request successfully',
  })
})
