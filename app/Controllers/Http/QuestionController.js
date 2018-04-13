'use strict'

const uuidV4 = require('uuid/v4');
const Database = use('Database')
const Question = use('App/Models/Question');

class QuestionController {

  async get ({session, request, response, view }) {
    const questions = await Question.query()
      .with('family').with('choices')
      .orderByRaw('RANDOM()').limit(40)
      .fetch();
    return response.send(questions);
  }
}
module.exports = QuestionController
