import { UserProvider } from '../user/userProvider';
import { Trip } from '../../models/Trip';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Utils/environment';


@Injectable()
export class TripProvider {

  private trip: Trip;

  private TRIP_URL = environment.SERVER_URL + "/trips";
  private USER_URL = environment.SERVER_URL + "/users";


  constructor(public http: HttpClient, private userProvider: UserProvider) {
    console.log('Hello TripProvider Provider');
  }

  getTrip(){
    const trip: Trip = new Trip();
    this.http
      .get<Trip>(`${this.USER_URL}/find/${this.userProvider.getUserId()}`).subscribe((response: any) => {
        trip.setOrigin(response.trip.origin);
        trip.setDestinationString(response.trip.destinationSting);
        trip.setDestinationLatLng(response.trip.destinationLatLng);
        trip.setItinerary(response.trip.citinerary);
        trip.setIsAccepted(response.trip.isAccepted);
    });
    return trip;
  }

  updateTrip(trip: Trip){
    return this.http.put<Trip>
    (`${this.TRIP_URL}/update/${this.userProvider.getUserId()}`, trip);
  }



}
