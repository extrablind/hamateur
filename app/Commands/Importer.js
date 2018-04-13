'use strict'

const { Command } = require('@adonisjs/ace')
const csv = require('ya-csv')
const Helpers = use('Helpers')
const Database = use('Database')
const Question = use('App/Models/Question')
const Family = use('App/Models/Family')

class Importer extends Command {
  static get signature () {
    return 'hamateur:importer'
  }

  static get description () {
    return 'Import base CSV and populate db'
  }

  async handle (args, options) {
  	this.info('Import question from CSV command')
    await Database.table('choices').delete()
    await Database.table('questions').delete()
    await Database.table('families').delete()

  	try{
      // CSV
    	var reader = csv.createCsvFileReader(Helpers.appRoot() +'/var/datas.csv', {
    	    'separator': ',',
    	    'quote': '"',
    	    'escape': '"',
    	    'comment': '',
    	});
    	var writer = new csv.CsvWriter(process.stdout);
    	var families = [];
    	var countRow = 0;
    //  const trx = await Database.beginTransaction()
      // Loop ver CSV
    	reader.addListener('data', async function(data) {
            var choices = [];

        		if(countRow >= 80){
              return;
            }
            countRow++ ;
            console.log('Importing question #' + countRow);

            // Create family if does not already exists
            var   family= {
              name : data[10],
              code : data[9]
            }
            if(families.indexOf(family.code) === -1){
              console.log("Creating new family : " + family.name + " with code " + family.code)
              families.push(family.code);
              var f = await Family.create(family)
      	    }else{
              var f =  await Family.query().from('families').where('code', family.code).fetch();
            }
            console.log(f);
            // Question
            var saveQuestion            = {};
            saveQuestion.systemId       = data[0];
            saveQuestion.content        = data[1]
            saveQuestion.image          = data[0] + '.png'
            saveQuestion.level          = data[8]
            saveQuestion.explanation    = data[11]
            saveQuestion.family_id      = f.id
            var question = await Question.create(saveQuestion)
              .catch((error) => {console.log(error)});

            // Answers
            for(let i=2;i<=5;i++){
               choices.push( {
                content:data[i],
                isGoodAnswer : (i-1 == data[6]),
              });
            }
          //  await question.family().create(f);
            await question.choices().createMany(choices)
              .catch((error) => {console.log(error)});


      	});
        // Commit
    	}catch(err){
        console.log(err)
    	}
  }
}

module.exports = Importer
