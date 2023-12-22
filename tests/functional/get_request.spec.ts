import { test } from '@japa/runner'

test('get request', async ({ client }) => {
  const response = await client.post('/get-user-support-requests')

  response.assertStatus(200)
  response.assertBodyContains({
    message: 'Fetched User requests successfully',
  })
})
