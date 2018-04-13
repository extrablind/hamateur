'use strict'

const Model = use('Model')

class Answer extends Model {

  choice () {
    return this.belongsTo('App/Models/Choice')
  }

  question () {
    return this.belongsTo('App/Models/Question')
  }

  exam () {
    return this.belongsTo('App/Models/Exam')
  }

  candidate () {
    return this.belongsTo('App/Models/candidate')
  }

}

module.exports = Question
