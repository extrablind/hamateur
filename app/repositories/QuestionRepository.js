'use strict'
const _ = require('lodash');
const Database = use('Database')
const Question = use('App/Models/Question');
const Logger = use('Logger')

class QuestionRepository {


  async getQuestion (question){
    var dbQuestion      = await Question.query().with('choices').where({id: question.id}).fetch();
    var q = dbQuestion.toJSON()[0]
    return q;
  }

  async singleRandom(){
    const question =  await Question.query()
          .with('family',  (builder) => {builder.select('id', 'question_id', 'content') })
          .with('choices',  (builder) => {builder.select('id', 'question_id', 'content', 'isGoodAnswer') })
          .select( 'id',  'content', 'image', 'containSchema', 'systemId', 'family_id' )
          .orderByRaw('RANDOM()')
          .limit(1)
          .fetch()
    return question.toJSON()[0]
  }

  async   getRandomByPart(part = 'technical', limit = 20){
    return await Question.query().with('family').with('choices') .where({part: part})      .orderByRaw('RANDOM()').limit(limit)  .fetch();
  }



}
module.exports = QuestionRepository
