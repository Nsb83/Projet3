import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RouteProvider {

  url;

  constructor(public http: HttpClient) {
    console.log('Hello RouteProvider Provider');
  }

  /**
   * Call at google maps direction API with start and end Lat Lng values.
   *
   * Use of a proxy to avoid CORS errors
   * @param start
   * @param end
   */
  getRoute(start, end) {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const urlGoogle = "https://maps.googleapis.com";

    this.url = proxyurl + urlGoogle + "/maps/api/directions/json?origin=" + start.lat +"+"+ start.lng + "&destination=" + end + "&key=AIzaSyBhqCcaN5OfApXOWr_1b2VkIBQqIwPQK44"
    return this.http.get(this.url);
  }
}

