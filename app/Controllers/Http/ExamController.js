'use strict'
const Database = use('Database')
const Helpers = use('Helpers')
const fs = use('fs')
const readFile = Helpers.promisify(fs.readFile)
const Answer = use('App/Models/Answer');
const Question = use('App/Models/Question');
const Exam = use('App/Models/Exam');
const _ = require('lodash');
const Logger = use('Logger')
const QuestionService = require ('../../services/QuestionService.js')

class ExamController {

   home ({session, request, response, view }) {
     return response.send({api:true});
  }

  async stop ({session, request, response, view }) {
  	var alreadyGiven = session.get('alreadyGiven', []);
  	let questions = await Database.from('questions')
  		.whereNotIn('id', alreadyGiven).limit(20)
       	return view.render('start');
  }



    async save({session, request, response, view }){
      var c = this;
      let answers = [];
      const {parts, candidate} = request.post();
      for (var partName in parts) {
        for (var index in parts[partName]) {
          let question =  parts[partName][index]
          var choice            = this.QuestionService.getSelectedChoice(question);
          var isGoodAnswer      = await this.QuestionService.isGoodAnswer(question, choice);
          //score+= await this.getScoreForQuestion(question);
          var answer            = {};
          answer.question_id    = question.id
          answer.isGoodAnswer   = isGoodAnswer
          answer.answered       = question.answered
          answer.part           = partName
          answer.candidate_id   = candidate.id
          answer.exam_id        = 1
          answer.choice_id      = choice
          answers.push(answer)
        }
      }
      await Answer.createMany(answers)

      let score = await this.QuestionService.getScore(parts);
      let saveExam = {
        score           : score,
        isPassing       : this.QuestionService.isPassing(score),
        isFinished      : true,
        isAutoFinished  : false,
        finishedAt      : new Date(),
        currentPart     : null,
        remainingTime   : 0,
        candidate_id    : candidate.id
      }
      var exam  =   await Exam.create(saveExam).catch((error) => {Logger.info(error)});
      let stats = await this.getStats(exam);
      return response.send({exam, stats});
    }

    async  getStats(exam){
        return {

        }
    }

  async correction({session, request, response, view }){
    const questions = request.post();
    var score = 0;
    for(let i=0; i<questions.length;i++){
      // No answer, score is unchanged
      if(!questions[i].answered){
        continue;
      }
      var question = await Question.query().with('choices').where({id: questions[i].id}).fetch();
      question = question.toJSON()[0];
      var goodChoice =    _.filter(question.choices, ['isGoodAnswer', 1])[0];
      var selectedChoice =  _.filter(questions[i].choices, ['selected', true])[0];
      // Good answer
      if(goodChoice.id == selectedChoice.id){
          score+= 2
      }
      // Bad answer
      else{
          score-= 3
      }
    }
    // Score thresold
    var passing = (score >= 12);
    response.send({score, passing})
  }

  async begin ({session, request, response, view }) {
    var file= __dirname + '/../../../dist/index.html';
    console.log(file);
       response.implicitEnd = false
       response.header('Content-type', 'text/html')
       fs.readFile(file, (error, contents) => {
         response.send(contents)
       })

  }
}

module.exports = ExamController
