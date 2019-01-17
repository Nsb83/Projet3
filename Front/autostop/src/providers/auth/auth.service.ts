import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Headers } from '@angular/http';
import { Credentials } from '../../models/Credentials';
import { environment } from '../Utils/environment';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  attemptAuth(credentials: Credentials): Observable<HttpResponse<any>> {
    return this.http.post(`${environment.SERVER_URL}/users/login`, credentials, 
    {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), observe: "response"});
  }
}

