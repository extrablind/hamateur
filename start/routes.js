'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')
Route.get('/', 'ExamController.home').as('home');

// API Routes
Route.post('/api/v1/register', 'ApiController.register')
Route.post('/api/v1/login', 'ApiController.login')

Route.group('api', function() {

    Route.post('/candidate/create', 'CandidateController.create').as('create-candidate');
    Route.get('/candidate/get', 'CandidateController.get').as('get-candidate');

    Route.post('/exam/correct', 'ExamController.correction');
    Route.post('/exam/save', 'ExamController.save');

    Route.get('/questions/get', 'QuestionController.get').as('get-questions');
    Route.get('/question/get', 'QuestionController.getSingle').as('get-question');
    Route.post('/question/correct', 'QuestionController.correct').as('correct-question');

}).prefix('/api/v1')