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
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const urlGoogle = "https://maps.googleapis.com"; 
    // this.url = proxyurl + urlGoogle + "/maps/api/directions/json?origin=" + start.lat +"+"+ start.lng + "&destination=" + end + "&key=AIzaSyBhqCcaN5OfApXOWr_1b2VkIBQqIwPQK44"
    // return from(fetch(this.url) 
    // .then(response => response.text())
    // .then(contents => console.log(contents))
    // .catch(() => console.log("Can’t access " + urlGoogle + " response. Blocked by browser?")))
    
    // this.url = "https://maps.googleapis.com/maps/api/directions/json?origin=" + start.lat +"+"+ start.lng + "&destination=" + end + "&key=AIzaSyBhqCcaN5OfApXOWr_1b2VkIBQqIwPQK44"
    this.url = proxyurl + urlGoogle + "/maps/api/directions/json?origin=" + start.lat +"+"+ start.lng + "&destination=" + end + "&key=AIzaSyBhqCcaN5OfApXOWr_1b2VkIBQqIwPQK44"
    return this.http.get(this.url);
  }
// "https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=AIzaSyBhqCcaN5OfApXOWr_1b2VkIBQqIwPQK44"
}

