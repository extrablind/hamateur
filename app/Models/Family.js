'use strict'

const Model = use('Model')

class Family extends Model {

  questions () {
    return this.hasMany('App/Models/Question')
  }

}
module.exports = Family
