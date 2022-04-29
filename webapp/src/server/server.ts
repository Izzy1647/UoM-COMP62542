import { createServer, Model } from 'miragejs'

export function mockServer() {
  return createServer({
    // environment,
    models: {
      user: Model,
      enrollment: Model,
      activities: Model,
      subscription: Model,
      newsletter: Model
    },
    // factories: {},
    // seeds(server) {},
    routes() {
      // this.get('/login', schema => {
      //   return schema.reminders.all()
      // })

      this.post('/login', (schema, request) => {
        // let attrs = JSON.parse(request.requestBody)
        return { status: 1, user: {
          id: 1,
          studentID: 1828282828,
        } }
      })
    }
  })
}
