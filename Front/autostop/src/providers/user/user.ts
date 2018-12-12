import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/User';

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

  createUser(user: User){
    let createUrl = this.URL_DB + "/create";
    this.http.post(createUrl, user);
  }
}
