import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class AuthenticationService {
    public token: string;
    private url: string = 'http://127.0.0.1:3333/api/v1';

    constructor(private http: HttpClient) {
        // set token if saved in local storage
        if(!localStorage.getItem('user')){
            return;
        }
        var user = JSON.parse(localStorage.getItem('user'));
        this.token = user.token;
    }

    login(email: string, password: string) {
        return this.http.post<any>(this.url + "/login", ({ email: email, password: password }))
            .map((response) => {
                if(!response.infos){
                    return false;
                }
                // login successful if there's a jwt token in the response
                let token = response.infos.token;
                if (!token) {
                    return false;
                }
                 // set token property
                 this.token = token;
                 // store username and jwt token in local storage to keep user logged in between page refreshes
                 localStorage.setItem('user', JSON.stringify({ email: email, token: token }));
                 return true;
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('user');
    }
}