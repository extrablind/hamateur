const QuestionService = require('../../services/QuestionService.js')
const QuestionRepository = require('../../repositories/QuestionRepository.js')
const Database = use('Database')
const Question = use('App/Models/Question');
const Logger = use('Logger')
const _ = require('lodash');

class QuestionController {

    constructor(){
      this.QuestionService = new QuestionService()
      this.QuestionRepository = new QuestionRepository()
    }

    async correct ({session, request, response, view }) {
      const q = request.post()
      var question      = await this.QuestionRepository.getQuestion(q)
      var isGoodAnswer  = await this.QuestionService.isGoodAnswer(q)
      var answered        = await this.QuestionService.getSelectedChoice(q)
      var goodAnswer    =  await this.QuestionService.getGoodAnswer(question)
      let isAnswered    = q.answered
      let goodId        = goodAnswer.id

      return response.send({
        isGoodAnswer  ,
        isAnswered    ,
        question      ,
        answered      ,
        goodAnswer    ,
        goodId
      });
    }

  async get ({session, request, response, view }) {
    const questions = {
      legal     :   await this.QuestionRepository.getRandomByPart('legal', 20),
      technical :   await this.QuestionRepository.getRandomByPart('technical',  20)
    }
    return response.send(questions);
  }

  async getSingle ({session, request, response, view }) {
    const question = await this.QuestionRepository.singleRandom();
    return response.send(question);
  }
}
module.exports = QuestionController
