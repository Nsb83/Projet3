import { UserProvider } from './../user/userProvider';
import { Trip } from './../../models/Trip';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TripProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TripProvider {

  private tokenId;
  private trip: Trip;

  private TRIP_URL = "http://localhost:8080/trip"
  private DRIVER_URL = "http://localhost:8080/drivers";
  private USER_URL = "http://localhost:8080/users";

  constructor(public http: HttpClient, private userProvider: UserProvider) {
    console.log('Hello TripProvider Provider');
  }

  createTrip(trip: Trip){
  }

  getTrip(){

  }

  updateTrip(trip: Trip){
    return this.http.put<Trip>
    (`${this.DRIVER_URL}/update/${this.tripProvider.getUserId()}`, driver);
  }



}
