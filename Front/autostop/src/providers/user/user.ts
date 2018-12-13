import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserProvider {

  private isDriver: boolean;
  private isPedestrian: boolean;

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
}
