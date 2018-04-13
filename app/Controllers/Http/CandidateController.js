'use strict'

const uuidV4 = require('uuid/v4');
const Database = use('Database')
const Candidate = use('App/Models/Candidate');
const Logger = use('Logger')

class CandidateController {

  async create ({session, request, response, view }) {
    var create =  {name: request.input('name').name, uuid: uuidV4()};
  //  const candidate = await Candidate.create(create)
  // await Database.insert({username:"api",email:"api@meduse.space", password:'api'}).into('users');

  await Database.insert(create).into('candidates');
  const candidate = await Database.from('candidates').where('uuid', create.uuid).first()
    session.put('candidate', candidate)
    return response.send(candidate);
  }

  async get ({session, request, response, view }) {
    var candidate = session.get('candidate');
    var uuid = request.input('uuid');
    var candidate = await Database.from('candidates').where('uuid', uuid).first()
    session.put('candidate', candidate);
    return response.send(candidate);
  }


}

module.exports = CandidateController
