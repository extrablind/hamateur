'use strict'

// Dependencies
const Env = use('Env')
const Validator = use('Validator')
const Config = use('Config')
const Database = use('Database')
const Helpers = use('Helpers')
const RandomString = use('randomstring')
const Email = use('emailjs')
const View = use('View')

// Models
const User = use('App/Model/User')
const UserProfile = use('App/Model/UserProfile')
const DesignCenter = use('App/Model/DesignCenter')
const Settings = use('App/Model/Setting')

// Properties
const FAIL      = 0
const SUCCESS   = 1
const SITE_URL  = "http://"+Env.get('HOST')+":"+Env.get('PORT')

// Messages
const MSG_API_AUTH_FAILED             = 'Api Authentication Failed.'
const MSG_REGISTERED_SUCCESS          = 'Registered Successfully.'
const MSG_LOGGED_IN_SUCCESS           = 'Logged In Successfully.'
const MSG_LOGGED_IN_CHECK             = 'You Are Logged In.'
const MSG_LOGGED_IN_FAIL              = 'Invalid Credentials.'
const MSG_FORGOT_PASS_EMAIL_SUCCESS   = 'Your password reset email has been sent. Please check your inbox to continue.'

class ApiController {

  * register (request, response) {

    let jsonResponse = {}

    // validate form input
    const validation = yield Validator.validateAll(request.all(), Config.get('validation.api.register.rules'), Config.get('validation.api.register.messages'))

    // show error messages upon validation fail
    if (validation.fails()) {

      jsonResponse.status = FAIL
      jsonResponse.response = {}
      jsonResponse.response.message = validation.messages()[0].message

    } else {

      // handle card image
      let card_image = null

      if ( request.file('card_image') ) {

        const image = request.file('card_image', {
          allowedExtensions: ['jpg', 'png', 'jpeg']
        })

        if (image.clientSize() > 0) {
          const filename = RandomString.generate({length: 30, capitalization: 'lowercase'}) + '.' + image.extension()
          yield image.move(Helpers.publicPath(Config.get('constants.user_card_img_upload_path')), filename)

          if (!image.moved()) {
            jsonResponse.status = FAIL
            jsonResponse.response = {}
            jsonResponse.response.message = image.errors()
            return response.json(jsonResponse)
          }

          // set value for DB
          card_image = filename
        }

      }

      // create user
      const user = yield User.create({
        username: new Date().getTime(),
        email: request.input('email'),
        password: request.input('password')
      })

      // create user profile
      const user_profile = yield UserProfile.create({
        user_id: user.id,
        user_type_id: 3, // designer
        first_name: request.input('first_name'),
        last_name: request.input('last_name'),
        business_name: request.input('business_name'),
        business_category_id: request.input('business_category'),
        card_image: card_image,
        phone: request.input('mobile_no'),
        is_active: 1
      })

      jsonResponse.status = SUCCESS
      jsonResponse.response = {}
      jsonResponse.response.message = MSG_REGISTERED_SUCCESS
      jsonResponse.response.user = {
        'id': user.id,
        'first_name': user_profile.first_name,
        'last_name': user_profile.last_name,
        'business_name': user_profile.business_name,
        'business_category_id': user_profile.business_category_id,
        'card_image': user_profile.card_image == null ? "" : SITE_URL + "/" + Config.get('constants.user_card_img_upload_path') + "/" + user_profile.card_image,
        'mobile_no': user_profile.phone
      }

    }

    return response.json(jsonResponse)

  }

  * login (request, response) {

    let jsonResponse = {}

    const email = request.input('email')
    const password = request.input('password')

    // validate form input
    const validation = yield Validator.validateAll(request.all(), Config.get('validation.api.login.rules'), Config.get('validation.api.login.messages'))

    if (validation.fails()) {

      jsonResponse.status = FAIL
      jsonResponse.response = {}
      jsonResponse.response.message = validation.messages()[0].message

    } else {

      try {
        const jwt = request.auth.authenticator('jwt')
        const token = yield jwt.attempt(email, password)
        const user = yield User.findBy('email', email)
        const user_profile = yield UserProfile.findBy('user_id', user.id)

        // check if user type is designer
        if ( user_profile.user_type_id == 3 ) {

          jsonResponse.status = SUCCESS
          jsonResponse.response = {}
          jsonResponse.response.message = MSG_LOGGED_IN_SUCCESS

          let card_image = null
          if (user_profile.card_image) {
            card_image = SITE_URL + "/" + Config.get('constants.user_card_img_upload_path') + "/" + user_profile.card_image
          }

          jsonResponse.response.user = {
            'id': user.id,
            'first_name': user_profile.first_name,
            'last_name': user_profile.last_name,
            'business_name': user_profile.business_name,
            'business_category_id': user_profile.business_category_id,
            'card_image': card_image,
            'mobile_no': user_profile.phone
          }
          jsonResponse.response.token = token

        } else {

          jsonResponse.status = FAIL
          jsonResponse.response = {}
          jsonResponse.response.message = MSG_LOGGED_IN_FAIL

        }
      } catch (e) {
        jsonResponse.status = FAIL
        jsonResponse.response = {}
        jsonResponse.response.message = e.message
      }

    }

    return response.json(jsonResponse)

  }

  * business_categories (request, response) {

    let jsonResponse = {}

    try {

      jsonResponse.status = SUCCESS
      const dbRecords = yield Database.select('id', 'name').from('business_categories')
      let records = []

      dbRecords.forEach(function(row) {
        records.push({
          id: row.id,
          name: row.name
        })
      })

      jsonResponse.response = records

    } catch (e) {

      jsonResponse.status = FAIL
      jsonResponse.response = {}
      jsonResponse.response.message = e.message

    }

    response.json(jsonResponse)

}

module.exports = ApiController