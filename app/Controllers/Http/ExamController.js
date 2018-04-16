'use strict'
const Database = use('Database')
const Helpers = use('Helpers')
const fs = use('fs')
const readFile = Helpers.promisify(fs.readFile)
const Logger = use('Logger')
const Answer = use('App/Models/Answer');
const Question = use('App/Models/Question');
const _ = require('lodash');

class ExamController {

  async stop ({session, request, response, view }) {
	var alreadyGiven = session.get('alreadyGiven', []);
	let questions = await Database.from('questions')
		.whereNotIn('id', alreadyGiven).limit(20)
     	return view.render('start');
  }



    async save({session, request, response, view }){
      const {questions, candidate} = request.post();
      var answer = new Answer();
      answer.
      /*
      table.increments()
      table.datetime('answeredAt')
      table.datetime('modifiedAt')
      table.integer('question_id')
      table.integer('choice_id')
      table.integer('exam_id')
      table.integer('candidate_id')
      table.timestamps()
      */

      //
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

      return response.send(candidate);

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
      response.send({exam})
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
