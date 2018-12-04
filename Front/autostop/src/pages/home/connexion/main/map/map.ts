import { Driver } from './../../../../../models/Driver';
import { GiveRatingPage } from './request-modal/response-modal/linking/give-rating/give-rating';
import { RequestModalPage } from './request-modal/request-modal';

import { SearchBarPage } from './search-bar/search-bar';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ModalController } from 'ionic-angular';

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
  Geocoder
} from "@ionic-native/google-maps";

// @IonicPage()
@Component({
  selector: "page-map",
  templateUrl: "map.html"
})
export class MapPage {
  map: GoogleMap;

  // modalRequest=  RequestModalPage;
  ratingPage = GiveRatingPage;

  // Test data for request-modal
  matchableUser : Driver = {
    name : "Gérard",
    surname : "Darmon",
    avatar : "./assets/imgs/darmon.jpg",
    rating : 4,
    destination : "6 Le Rampeau, 69510 THURINS",
    carName : "Renault Clio 3",
    carColor : "black",
    plateCar : "AZ45VP18",
    phoneNumber : "0836656565",

  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {}

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
      console.log(location);
      let options: GoogleMapOptions = {
        camera: {
          target: location.latLng,
          zoom: 10
        }
      };
      // Création de la carte
      this.map = GoogleMaps.create("map", options);

      // MARKER
      // Création d'un marqueur et son ajout à map avec la géoloc
      // Possibilité de passer un objet Options en param

      let markerGeoloc: Marker = this.map.addMarkerSync({
        position: location.latLng,
        title: "Ma position"
      });
      // Affichage de ses infos
      markerGeoloc.showInfoWindow();

      // CERCLE
      // création d'un objet avec lat et lng à partir d la géoloc
      let centre2 = location.latLng;
      // création du cercle avec comme centre la géoloc
      let circle: Circle = this.map.addCircleSync({
        center: centre2,
        radius: 500,
        strokeColor: "#329032",
        strokeWidth: 5,
        fillColor: "#c6d875"
      });
      this.map.moveCamera({
        target: circle.getBounds
      });
    });


  }

  goToSpecificLocation(){
    let options: GeocoderRequest = {
      address: "6 Le Rampeau, 69510 THURINS"
      // Marche avec plus d'infos genre '6 Le Rampeau, 69510, Thurins, FRANCE'
    };
    // Address -> latitude,longitude
    Geocoder.geocode(options)
    .then((results: GeocoderResult[]) => {
      console.log(results);

      let markerPossibleMatch : Marker = this.map.addMarkerSync({
        'position': results[0].position,
        'title':  JSON.stringify(results[0].position)
      })
      markerPossibleMatch.showInfoWindow();
    })
  }

  showMatchModal(){
    const matchModal = this.modalCtrl.create(RequestModalPage, { matchableUser : this.matchableUser});
    matchModal.present();
  }


}
