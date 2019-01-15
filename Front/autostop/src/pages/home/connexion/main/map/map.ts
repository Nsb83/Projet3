import { RouteProvider } from './../../../../../providers/route/route';
// import { Trip } from './../../../../../models/Trip';
import { User } from './../../../../../models/User';
import { RequestModalPage } from './request-modal/request-modal';
import { SearchBarPage } from './search-bar/search-bar';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ModalController, ShowWhen } from 'ionic-angular';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  Circle,
  LocationService,
  MyLocationOptions,
  MyLocation,
  GeocoderRequest,
  GeocoderResult,
  Geocoder,
  LatLng,
  Polyline,
  ILatLng,
  LatLngBounds
} from "@ionic-native/google-maps";

// @IonicPage()
@Component({
  selector: "page-map",
  templateUrl: "map.html"
})

export class MapPage {
  map: GoogleMap;
  inputSearch: String;
  userPosition: MyLocation;
  searchValue: any;
  routeJson : any;

  option: MyLocationOptions = {
    // true use GPS as much as possible (lot battery)
    // false network location (save battery)
    enableHighAccuracy: true
  };

  matchableUser = new User("Doe", "John", "08 36 65 65 65", "male", "29/02/1948", "gegedarmon@mail.fr", "superpassword");
  // Test data for request-modal

  positionOtherUser  = {
    lat: 45.682808,
    lng: 4.641063000000031
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public RouteProvider: RouteProvider) {}

  // Load map only after view is initialized
  ngAfterViewInit() {
    this.loadMap();
    this.matchableUser.setImgUrl("./assets/imgs/profileImg1.png")
  }

  loadMap() {
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: "AIzaSyBhqCcaN5OfApXOWr_1b2VkIBQqIwPQK44",
      API_KEY_FOR_BROWSER_DEBUG: "AIzaSyBhqCcaN5OfApXOWr_1b2VkIBQqIwPQK44"
    });

    // Création de la carte avec géolocalisation
    LocationService.getMyLocation(this.option).then((location: MyLocation) => {
      this.userPosition = location;
      this.map = GoogleMaps.create("map");
      this.map.moveCamera({
        target: this.userPosition.latLng,
        zoom: 15
      });
      this.addMarkerAndCircle();
    });
  }

  addMarkerAndCircle() {
      // MARKER
      // Création d'un marqueur et son ajout à map avec la géoloc
      // Possibilité de passer un objet Options en param
      let markerGeoloc: Marker = this.map.addMarkerSync({
        position: this.userPosition.latLng,
        icon: {url: "../assets/icon/thumb.png",
              size: {
                width: 32,
                height: 32
              }
            }
      });

      // CERCLE
      // création d'un objet avec lat et lng à partir d la géoloc
      let center = this.userPosition.latLng;
      // création du cercle avec comme centre la géoloc
      let circle: Circle = this.map.addCircleSync({
        center: center,
        radius: 500,
        strokeColor: "#258c3d",
        // strokeWidth: 30, A QUOI CA SERT???
        fillColor: "rgba(239, 244, 225, 0.45)"
      });
    }

  receiveMessage($event) {
    this.searchValue = $event
    this.getRouteJson($event).subscribe((data: any) => {
      this.displayRoute(data.routes[0].overview_polyline.points);
      this.addMarkerAndCircle();
      this.goToSpecificLocation();
    });
  }

  displayRoute(routeJson) {
    this.map.clear().then(() => {
      this.showPoly(routeJson);
      // this.addMarkerAndCircle();
      // this.goToSpecificLocation();
    });
  }

  getRouteJson(searchValue) {
      return this.RouteProvider.getRoute(this.userPosition.latLng, searchValue);
  }

  ///////// Polylines ////////////////////
  showPoly(polyRoute) {
      const decodePolyline = require('decode-google-map-polyline');
      let arrayPoly = decodePolyline(polyRoute);
      // console.log(decodePolyline(polyRoute));

    let polyline: Polyline = this.map.addPolylineSync({
      points: arrayPoly,
      color: '#258c3d',
      width: 5,
      geodesic: true,
      clickable: true
      // clickable a enlever, DEV PURPOSE ONLY
    })

    /////// route clickable DEV PURPOSE ONLY
    polyline.on(GoogleMapsEvent.POLYLINE_CLICK).subscribe((params: any) => {
      let position: LatLng = <LatLng>params[0];
      let markerPoly: Marker = this.map.addMarkerSync({
        position: position,
        title: position.toUrlValue(),
        disableAutoPan: true
      });

      markerPoly.showInfoWindow();

    });
  }
    // FIN POLY
    // fin route direction


  // Show modal for matching request
  showMatchModal() {
    const matchModal = this.modalCtrl.create(RequestModalPage, { matchableUser: this.matchableUser });
    matchModal.present();
  }

  goToSpecificLocation() {
    let options: GeocoderRequest = {
    address: this.searchValue
    };

    Geocoder.geocode(options)
    .then((results: GeocoderResult[]) => {
      let markerDestination : Marker = this.map.addMarkerSync({
      'position': results[0].position,
      'title': JSON.stringify(results[0].extra.lines),
      icon: {url: "../assets/icon/thumb.png",
                size: {
                  width: 32,
                  height: 32
                }
              }
      })
      this.getCenterRoute(this.userPosition.latLng,results[0].position)
    });

    // this.getCenterRoute();
    // this.setZoomCamera(centerRoute);


    // Création faux marqueur autre utilisateur
    let markerMatch : Marker = this.map.addMarkerSync({
      'position': this.positionOtherUser,
      icon: {url: "../assets/icon/driver.png",
                size: {
                  width: 32,
                  height: 32
                }
              }
      });

    markerMatch.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      this.showMatchModal();
    });
  }
  getCenterRoute(start, end){

    let bounds: LatLngBounds = new LatLngBounds([
      start,
      end
    ]);
    let center = bounds.getCenter();
    let cameraPos : CameraPosition<ILatLng> = {
      target: center,
      zoom : this.defineZoom(bounds)
      // .northeast.lat, bounds.southwest.lat
    };
    console.log(center);
    this.map.animateCamera(cameraPos);
  }

  defineZoom(bounds: LatLngBounds){
    console.log(bounds);

    let ecartMaxLat = bounds.northeast.lat - bounds.southwest.lat;
    let ecartMaxLng = bounds.northeast.lng - bounds.southwest.lng;
    console.log(ecartMaxLng)
    let ecartMax;
    if(ecartMaxLat>ecartMaxLng){
      ecartMax = ecartMaxLat;
    }
    else ecartMax = ecartMaxLng;

    console.log(ecartMax);
    let answer;
    if(ecartMax<0.01){
      answer = 15;
    }
    else if(ecartMaxLat<0.03 && ecartMaxLat>=0.01 || ecartMaxLng<0.05 && ecartMaxLng>=0.01){
      answer = 14;
    }
    else if(ecartMaxLat<0.05 && ecartMaxLat>=0.03 || ecartMaxLng<0.08 && ecartMaxLng>=0.05){
      answer = 13;
    }
    else if(ecartMaxLat<0.07 && ecartMaxLat>=0.05 || ecartMaxLng<0.10 && ecartMaxLng>=0.08){
      answer = 12;
    }
    else if(ecartMaxLat<0.09 && ecartMaxLat>=0.07 || ecartMaxLng<0.13 && ecartMaxLng>=0.10){
      answer = 11;
    }
    else if(ecartMaxLat<0.11 && ecartMaxLat>=0.09 || ecartMaxLng<0.16 && ecartMaxLng>=0.13){
      answer = 10;
    }
    else if(ecartMaxLat<0.13 && ecartMaxLat>=0.11 || ecartMaxLng<0.20 && ecartMaxLng>=0.16){
      answer = 10;
    }
    else if(ecartMaxLat<0.15 && ecartMaxLat>=0.13 || ecartMaxLng<0.24 && ecartMaxLng>=0.20){
      answer = 9;
    }
    else if(ecartMaxLat<0.17 && ecartMaxLat>=0.15 || ecartMaxLng<0.28 && ecartMaxLng>=0.24){
      answer = 9;
    }
    else if(ecartMaxLat<0.19 && ecartMaxLat>=0.17 || ecartMaxLng<0.32 && ecartMaxLng>=0.28){
      answer = 8;
    }
    else if(ecartMaxLat<0.21 && ecartMaxLat>=0.19 || ecartMaxLng<0.36 && ecartMaxLng>=0.32){
      answer = 8;
    }
    else {
      answer = 7;
    }
    return answer;
  }

}
