'use strict'

const Model = use('Model')

class Exam extends Model {

  answers () {
    return this.hasMany('App/Models/Answer')
  }

}

module.exports = Exam
