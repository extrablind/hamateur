'use strict'
const _ = require('lodash');
const uuidV4 = require('uuid/v4');
const Database = use('Database')
const Question = use('App/Models/Question');
const Logger = use('Logger')
const QuestionRepository = require('../repositories/QuestionRepository.js')

class QuestionService {
  constructor(){
    this.QuestionRepository = new QuestionRepository()
  }

  isPassing(score){
    return score>= 12
  }

  async getScore(parts){
      let c = this
      var score = 0;
      for (var partName in parts) {
        for (var index in parts[partName]) {
          let question =  parts[partName][index]
          var choice            = this.getSelectedChoice(question);
          var isGoodAnswer      = await this.isGoodAnswer(question, choice);
          score+= await this.getScoreForQuestion(question);
        }
      }
     return score;
    }



    async   getScoreForQuestion(question){
        var choice            = this.getSelectedChoice(question);
        var isGoodAnswer      = await this.isGoodAnswer(question, choice);
        if(!question.answered){
          return 0;
        }
        if(isGoodAnswer){
            return 2
        }
        return -3
      }



  async getGoodAnswer (question){
    return  await _.filter(question.choices, ['isGoodAnswer', 1])[0];
  }

  async isGoodAnswer(question){
     var dbQuestion      =  await this.QuestionRepository.getQuestion(question)
     var goodAnswer      =  await this.getGoodAnswer(dbQuestion)
     const selected      =  await this.getSelectedChoice(question)
     if(!selected){
       return false;
     }
     return (goodAnswer.id === selected.id);
   }

    getSelectedChoice(question){
       for (let index in question.choices){
        if(question.choices[index].selected === true){
            return question.choices[index]
        }
      }
      Logger.info("not found")
      return null;
   }
}
module.exports = QuestionService
