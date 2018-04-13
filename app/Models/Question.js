'use strict'

const Model = use('Model')
console.log('question');

class Question extends Model {

  choices () {
    return this.hasMany('App/Models/Choice', 'id', 'question_id')
  }

  answers () {
    return this.hasMany('App/Models/Answer')
  }

	family () {
		return this.belongsTo('App/Models/Family')
	}

}

module.exports = Question
