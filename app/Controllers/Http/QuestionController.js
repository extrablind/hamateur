'use strict'

const uuidV4 = require('uuid/v4');
const Database = use('Database')
const Question = use('App/Models/Question');

class QuestionController {

  async get ({session, request, response, view }) {
    const questions = {
      legal :    await Question.query().with('family').with('choices') .where({part: 'legal'})      .orderByRaw('RANDOM()').limit(20)  .fetch(),
      technical :   await Question.query()  .with('family').with('choices').where({part: 'technical'})        .orderByRaw('RANDOM()').limit(20)  .fetch()
      };
    return response.send(questions);
  }
}
module.exports = QuestionController
