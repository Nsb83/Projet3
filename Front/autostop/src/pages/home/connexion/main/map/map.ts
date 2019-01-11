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
  ILatLng
} from "@ionic-native/google-maps";

// @IonicPage()
@Component({
  selector: "page-map",
  templateUrl: "map.html"
})

export class MapPage {
  map: GoogleMap;
  inputSearch;
  userPosition;
  searchValue;
  routeJson : any;
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
  }

  loadMap() {
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: "AIzaSyBhqCcaN5OfApXOWr_1b2VkIBQqIwPQK44",
      API_KEY_FOR_BROWSER_DEBUG: "AIzaSyBhqCcaN5OfApXOWr_1b2VkIBQqIwPQK44"
    });

    let option: MyLocationOptions = {
      // true use GPS as much as possible (lot battery)
      // false network location (save battery)
      enableHighAccuracy: true
    };

    // Réception de la géoloc et affichage de la carte centrée dessus avec les options
    LocationService.getMyLocation(option).then((location: MyLocation) => {
      this.userPosition = location;
      let options: GoogleMapOptions = {
        camera: {
          target: location.latLng,
          zoom: 15
        }
      };

      // Création de la carte
      this.map = GoogleMaps.create("map", options);

      // MARKER
      // Création d'un marqueur et son ajout à map avec la géoloc
      // Possibilité de passer un objet Options en param

      let markerGeoloc: Marker = this.map.addMarkerSync({
        position: location.latLng,
        icon: {url: "../assets/icon/thumb.png",
              size: {
                width: 32,
                height: 32
              }
            }
      });

      // CERCLE
      // création d'un objet avec lat et lng à partir d la géoloc
      let centre = location.latLng;
      // création du cercle avec comme centre la géoloc
      let circle: Circle = this.map.addCircleSync({
        center: centre,
        radius: 500,
        strokeColor: "#258c3d",
        // strokeWidth: 30, A QUOI CA SERT???
        fillColor: "rgba(239, 244, 225, 0.45)"
      });
      // this.map.moveCamera({
      //   target: circle.getBounds
      // });
    });
  }

  receiveMessage($event) {
    this.searchValue = $event
    this.getRouteJson($event);
    setTimeout(() => {
      this.map.clear();
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
      let centre = this.userPosition.latLng;
      // création du cercle avec comme centre la géoloc
      let circle: Circle = this.map.addCircleSync({
        center: centre,
        radius: 500,
        strokeColor: "#258c3d",
        // strokeWidth: 30, A QUOI CA SERT???
        fillColor: "rgba(239, 244, 225, 0.45)"
      });
      this.showPoly(this.routeJson);
    }, 1000); 
  }

  getRouteJson(searchValue){
    let option: MyLocationOptions = {
      enableHighAccuracy: true
    };
    LocationService.getMyLocation(option).then((location: MyLocation) => {
      this.RouteProvider.getRoute(location.latLng, searchValue).subscribe((data: any)=>
        this.routeJson = data.routes[0].overview_polyline.points);
    });
  };

  // displayRouteJson(){
  //   this.showPoly(this.routeJson);
  // }
  ///////// Polylines ////////////////////
  showPoly(polyRoute){
      const decodePolyline = require('decode-google-map-polyline');
      let arrayPoly = decodePolyline(polyRoute);
      console.log(decodePolyline(polyRoute));

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
    ///////////////
  }
    // FIN POLY
    // fin route direction


  // Show modal for matching request
  showMatchModal(){
    const matchModal = this.modalCtrl.create(RequestModalPage, { matchableUser: this.matchableUser });
    matchModal.present();
  }

  goToSpecificLocation(){
    let options: GeocoderRequest = {
    address: this.searchValue
    // Marche avec plus d'infos genre '6 Le Rampeau, 69510, Thurins, FRANCE'
    };
    // Address -> latitude,longitude
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
      markerDestination.showInfoWindow();
    })


        // Création faux marqueur autre utilisateur

    let markerMatch : Marker = this.map.addMarkerSync({
      'position': this.positionOtherUser,
      icon: {url: "../assets/icon/driver.png",
                size: {
                  width: 32,
                  height: 32
                }
              }
      })
      markerMatch.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        this.showMatchModal();
      })
    }
}
