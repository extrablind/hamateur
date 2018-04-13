import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class DataService {

    constructor(private http: HttpClient) {
      this.http = http;
    }

    private url: string = 'http://127.0.0.1:3333/api/v1';

   createCandidate(name){
     return this.http.post(this.url + "/candidate/create", {name:name})
                       .toPromise()
                       .then(candidate => {return candidate });
    }
    getCandidate(uuid){
      console.log(uuid)
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
       .then(result => { return result });
    }

}
