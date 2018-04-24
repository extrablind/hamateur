'use strict'

const User = use('App/Models/User')
const Logger = use('Logger')

class UserController {

  async login({ request, auth, response }) {
    const { email, password } = request.post()
    Logger.info(email, password)
    const { token } = await auth.attempt(email, password)
    response.status(200).send({ token })
  }

  async register({ request, auth, response }) {
    const { email, password, username } = request.post()
    const user = await User.create({ email, password, username })
    response.status(201).send("ok")
  }

  async me({ request, auth, response }) {
    response.status(200).send(auth.user)
  }

}

module.exports = UserController