import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Headers } from '@angular/http';

const httpOptions = {
  
};

@Injectable()
export class AuthService {

  baseUrl: 'http://localhost:8080/users/';

  constructor(private http: HttpClient) {
  }


  attemptAuth(email: string, password: string): Observable<HttpResponse<any>> {

    const credentials = {email: email, password: password};
    console.log('attempAuth ::' + JSON.stringify(credentials));
    return this.http.post('http://localhost:8080/users/login', credentials, 
    {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), observe: "response"});

  }

}

