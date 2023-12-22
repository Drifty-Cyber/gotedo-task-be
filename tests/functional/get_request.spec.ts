import { test } from '@japa/runner'

test('get user requests', async ({ client }) => {
  const response = await client.get('/get-user-support-requests/jessicadavis@gmail.com')

  response.assertStatus(200)
  response.assertBodyContains({
    status: 'Success',
  })
})
