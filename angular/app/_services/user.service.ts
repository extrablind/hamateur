import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/index';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class UserService {

    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService) {
    }
    getHeaders(){
        return {
          'Authorization' : 'Bearer ' +  this.authenticationService.token 
        }
      }
  
    getUsers(): Observable<User[]> {
        // add authorization header with jwt token
       // let options = new RequestOptions({ headers: headers });
        // get users from api
        let headers = this.getHeaders();
        return this.http.get('/api/users', {headers})
            .map((response: Response) => response.json());
    }
}