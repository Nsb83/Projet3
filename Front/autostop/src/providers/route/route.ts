import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RouteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RouteProvider {

  url;

  constructor(public http: HttpClient) {
    console.log('Hello RouteProvider Provider');
  }

  getRoute(start, end) {
    console.log(start);
    console.log(end);

    // this.url = "https://maps.googleapis.com/maps/api/directions/json?origin=" + start + "&destination=" + end + "&key=AIzaSyBhqCcaN5OfApXOWr_1b2VkIBQqIwPQK44"
   this.url = "https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=AIzaSyBhqCcaN5OfApXOWr_1b2VkIBQqIwPQK44";

    return this.http.get(this.url);
    // directionsService.route({
    //   origin: this.start,
    //   destination: this.end,
    //   travelMode: 'DRIVING'
    // }, function(response, status) {
    //   if (status === 'OK') {
    //     directionsDisplay.setDirections(response);
    //   } else {
    //     window.alert('Directions request failed due to ' + status);
    //   }
    // });
  }
// "https://maps.googleapis.com/maps/api/js?key=AIzaSyBhqCcaN5OfApXOWr_1b2VkIBQqIwPQK44&callback=getRoute"

// "https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=AIzaSyBhqCcaN5OfApXOWr_1b2VkIBQqIwPQK44"

}

