'use strict'
const Database = use('Database')
const Helpers = use('Helpers')
const fs = use('fs')
const readFile = Helpers.promisify(fs.readFile)

class ExamController {

  async stop ({session, request, response, view }) {
	var alreadyGiven = session.get('alreadyGiven', []);
	let questions = await Database.from('questions')
		.whereNotIn('id', alreadyGiven).limit(20)
     	return view.render('start');
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
