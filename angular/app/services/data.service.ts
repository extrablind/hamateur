import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// const _ = require('lodash');
import * as _ from 'lodash'
import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class DataService {
    private url: string = 'http://127.0.0.1:3333/api/v1';

    constructor(private http: HttpClient, private authenticationService:AuthenticationService) {
      this.http = http;
    }

  getHeaders(){
      return {
        'Authorization' : 'Bearer ' +  this.authenticationService.token 
      }
    }


    // User
    createUser(user){
      return this.http.post(this.url + "/register", user)
                        .toPromise()
                        .then(token => {return token });
     }

    getUser(){
      let headers = this.getHeaders();
      return this.http.get(this.url + "/users/me", {headers: headers})
        .map((response) => {
          return response
      });
    }

    getQuestion(){
      let headers = this.getHeaders();
     return this.http.get(this.url + "/question/get", {headers: headers})
       .toPromise()
       .then((question) => {
         question['answered'] = false;
         for (var i in question['choices']) {
           question['choices'][i]['selected'] = false;
         }
         return question
       });
    }

    getQuestions(){
      let headers = this.getHeaders();
     return this.http.get(this.url + "/questions/get", { headers: headers})
       .toPromise()
       .then(parts => {
         // Add some angular technical fields here
         _.forEach(parts, function(questions, partName) {
           _.forEach(questions, function(question, i) {
             parts[partName][i].answered = false;
             _.forEach(question.choices, function(choice, j) {
               parts[partName][i].choices[j].selected = false;
             });
           });
         });
         return parts });
    }

    correct(datas){
      let headers = this.getHeaders();

      return this.http.post(this.url + "/exam/correct", datas,  {headers: headers})
                        .toPromise()
                        .then(r => {return r });
    }

    correctQuestion(question){
      let headers = this.getHeaders();

      return this.http.post(this.url + "/question/correct", question, {headers: headers})
                        .toPromise()
                        .then(r => {return r });
    }

    saveExam(datas){
      let headers = this.getHeaders();
      return this.http.post(this.url + "/exam/save", datas, {headers: headers})
                        .toPromise()
                        .then(exam => {return exam });
    }

    getExamScore(datas){
      let headers = this.getHeaders();
      return this.http.post(this.url + "/exam/get-score", datas, {headers: headers})
                        .toPromise()
                        .then(score => {return score });
    }

}
