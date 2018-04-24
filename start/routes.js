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

// Regular website
Route.get('/', 'ExamController.home').as('home');

// Route.post('/candidate/create', 'CandidateController.create').as('create-candidate');
// Route.get('/candidate/get', 'CandidateController.get').as('get-candidate');


// API Routes public
Route.group('api-public', function() {
  Route.post('/login', 'UserController.login')
  Route.post('/register', 'UserController.register')
  //Route.get('/logout', 'UserController.logout')
}).prefix('/api/v1');

// API Routes authenticated
Route.group('api', function() {
    Route.get('/users/me', 'UserController.me')

    Route.post('/exam/correct', 'ExamController.correction')
    Route.post('/exam/save', 'ExamController.save')

    Route.get('/questions/get', 'QuestionController.get')
    Route.get('/question/get', 'QuestionController.getSingle')
    Route.post('/question/correct', 'QuestionController.correct')

}).prefix('/api/v1').middleware('auth')