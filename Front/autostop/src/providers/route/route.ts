import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RouteProvider {

  url;
  data;

  constructor(public http: HttpClient) {
    console.log('Hello RouteProvider Provider');
  }

  getRoute(start, end) {
    console.log(start);
    console.log(end);

    this.url = "https://maps.googleapis.com/maps/api/directions/json?origin=" + start.lat +"+"+ start.lng + "&destination=" + end + "&key=AIzaSyBhqCcaN5OfApXOWr_1b2VkIBQqIwPQK44"
    console.log(this.url)
    //  this.url = "https://maps.googleapis.com/maps/api/directions/json?origin=Rampeau+Thurins&destination=Rue+Delandine+Lyon&key=AIzaSyBhqCcaN5OfApXOWr_1b2VkIBQqIwPQK44";
    // this.data = this.http.get(this.url)
    // this.data = this.data.routes.overview_polyline.points;
    return this.http.get(this.url);
  }
// "https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=AIzaSyBhqCcaN5OfApXOWr_1b2VkIBQqIwPQK44"

}

