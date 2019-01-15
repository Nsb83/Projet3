import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Headers } from '@angular/http';
import { Credentials } from '../../models/Credentials';

const httpOptions = {

};

@Injectable()
export class AuthService {

  // baseUrl: 'http://10.0.2.2/users/';
  // baseUrl: 'http://localhost:8080/users/';

  constructor(private http: HttpClient) {
  }


  attemptAuth(credentials: Credentials): Observable<HttpResponse<any>> {
    // console.log('attempAuth ::' + JSON.stringify(credentials));
    // return this.http.post('http://10.0.2.2:8080/users/login', credentials, 
    return this.http.post('http://localhost:8080/users/login', credentials, 
    {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), observe: "response"});

  }

}

