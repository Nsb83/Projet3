import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};


@Injectable()
export class UserProvider {

  private isDriver: boolean;
  private isPedestrian: boolean;
  private URL_DB = "http://localhost:8080/users";

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }
  
  setDriverProfile() {
    this.isDriver = true;
    this.isPedestrian = false;
  }

  setPedestrianProfile() {
    this.isDriver = false;
    this.isPedestrian = true;
  }

  getDriverProfile(){
    return this.isDriver;
  }

  getPedestrianProfile(){
    return this.isPedestrian;
  }



// *********************************************
//            METHOD TO BE TESTED
// *********************************************
testServer(){
  let obs = this.http.get(this.URL_DB + "/findAll");
  obs.subscribe((response) => console.log(response));
}  

createUser(user: User) {
    let createUserUrl = this.URL_DB + "/create";
    console.log(createUserUrl);
    return this.http.post<User>(createUserUrl, user, httpOptions)
  };


// *********************************************
}
