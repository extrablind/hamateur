'use strict'

const Schema = use('Schema')

class AppSchema extends Schema {
  up () {
    this.create('questions', (table) => {
        table.increments()
        table.timestamps()
      	table.text('content', 'longtext')
      	table.string('image')
        table.string('systemId')
      	table.integer('level')
        table.boolean('containSchema')
      	table.text('explanation', 'longtext')
        table.string('part')
        table.integer('family_id')
    });

    this.create('families', (table) => {
        table.increments()
        table.timestamps()
        table.string('name')
        table.string('code')
     });


 this.create('choices', (table) => {
        table.increments()
      	table.boolean('isGoodAnswer')
        table.string('content')
        table.integer('question_id')
        table.timestamps()
  });

 this.create('candidates', (table) => {
        table.increments()
        table.string('uuid')
        table.string('name')
        table.timestamps()
    });

 this.create('exams', (table) => {
        table.increments()
        table.int('remainingTime')
        table.int('score')
        table.boolean('isFinished')
        table.boolean('isPassing')
        table.datetime('finishedAt')
        table.string('currentPart')
        table.integer('candidate_id')
        table.timestamps()
  });

  this.create('answers', (table) => {
         table.increments()
         table.datetime('answeredAt')
         table.datetime('modifiedAt')
         table.integer('question_id')
         table.integer('choice_id')
         table.integer('exam_id')
         table.integer('candidate_id')
         table.timestamps()
   });
}

  down () {
    this.drop('questions')
    this.drop('answers')
    this.drop('choices')
    this.drop('families')
    this.drop('exams')
    this.drop('candidates')
  }
}

module.exports = AppSchema
