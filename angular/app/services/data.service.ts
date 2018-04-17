import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
const _ = require('lodash');
  
@Injectable()
export class DataService {

    constructor(private http: HttpClient) {
      this.http = http;
    }

    private url: string = 'http://127.0.0.1:3333/api/v1';

    correct(datas){
      return this.http.post(this.url + "/exam/correct", datas)
                        .toPromise()
                        .then(r => {return r });
    }

    saveExam(datas){
      return this.http.post(this.url + "/exam/save", datas)
                        .toPromise()
                        .then(exam => {return exam });
    }

    getExamScore(datas){
      return this.http.post(this.url + "/exam/get-score", datas)
                        .toPromise()
                        .then(score => {return score });
    }


   createCandidate(name){
     return this.http.post(this.url + "/candidate/create", {name:name})
                       .toPromise()
                       .then(candidate => {return candidate });
    }

    getCandidate(uuid){
      let headers = new HttpHeaders();
            let params = new HttpParams();
            params = params.append('uuid',uuid);
     return this.http.get(this.url + "/candidate/get", {headers, params})
       .toPromise()
       .then(result => { return result });
    }

    getQuestions(){
      let headers = new HttpHeaders();
            let params = new HttpParams();
     return this.http.get(this.url + "/questions/get", {headers, params})
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
         console.log(parts)
         return parts });
    }

}
