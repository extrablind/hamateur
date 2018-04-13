'use strict'

class Api {

  * handle (request, response, next) {

    // here goes your middleware logic
    const authenticator = request.auth.authenticator('jwt')
    const isLoggedIn = yield authenticator.check()

    if (!isLoggedIn) {
      return response.json({
        status: 0,
        response: {
          message: 'API Authentication Failed.'
        }
      })
    }

    // yield next to pass the request to next middleware or controller
    yield next

  }

}

module.exports = Api