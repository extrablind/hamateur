'use strict'

const Model = use('Model')

class Candidate extends Model {
  exams () {
    return this.hasMany('App/Models/Exam')
  }

  answers () {
    return this.hasMany('App/Models/Answer')
  }

}

module.exports = Candidate
