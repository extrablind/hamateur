'use strict'

const Model = use('Model')

class Choice extends Model {
 question () {
    return this.belongsTo('App/Models/Question')
  }
  /*
  answers () {
     return this.hasMany('App/Models/Answer')
   }
   */
}

module.exports = Choice
