import { UserProvider } from './../../../../../providers/user/userProvider';
import { RouteProvider } from './../../../../../providers/route/route';
import { User } from './../../../../../models/User';
import { RequestModalPage } from './request-modal/request-modal';
import { SearchBarPage } from './search-bar/search-bar';
import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, IonicPage, ModalController, ShowWhen } from 'ionic-angular';
import { Trip } from '../../../../../models/Trip';
import { MessageProvider } from '../../../../../providers/Messages/MessageProvider';
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
import { TripProvider } from '../../../../../providers/trip/trip';
import { Observable } from 'rxjs';
import { DriverProvider } from '../../../../../providers/driver/driverProvider';


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
  polyline: Polyline;
  markerDestination : Marker;
  iconPath: String;
  arrayPoly: LatLng[];
  validatedTrip: Trip;
  destinationILatLng: ILatLng;
  user: User;


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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public routeProvider: RouteProvider,
              public messageProvider: MessageProvider,
              public alrtCtrl: AlertController,
              public userProvider: UserProvider,
              public tripProvider: TripProvider,
              public driverProvider: DriverProvider) {}

  ngOnInit(){
    this.userProvider.getUser().subscribe(response => {
      this.user = response;
    });
  }

  // Load map only after view is initialized
  ngAfterViewInit() {
    this.loadMap();
    this.matchableUser.setImgUrl("./assets/imgs/profileImg1.png");
  }

  ngAfterViewChecked(){
    this.setIconUser();
  }

  setIconUser(){
    if(this.user.isVehiculed()) {
      this.iconPath = "../assets/icon/driver.png";
    }
    else this.iconPath = "../assets/icon/thumb.png";

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
        icon: {url: this.iconPath,
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
    this.searchValue = $event;
    this.getRouteJson($event).subscribe(
      (data: any) => {
        if (data.status === "OK") {
          console.log(data);
          this.validatedTrip  = new Trip(data.routes[0].legs[0].start_location,
                              data.routes[0].legs[0].end_address,
                              data.routes[0].legs[0].end_location,
                              data.routes[0].overview_polyline.points,
                              );
                              console.log(this.validatedTrip);
          this.displayRoute(data.routes[0].overview_polyline.points);
          this.addMarkerAndCircle();
          this.goToSpecificLocation();
        } else {
          this.messageProvider.myAlertMethod("Désolé", "Nous n'avons pas trouvé votre adresse de destination...", false);
        }
      });
  }

  displayRoute(routeJson) {
    if (this.polyline !== undefined) {
      this.polyline.remove();
      this.markerDestination.remove();
    }
    this.showPoly(routeJson);
  }

  getRouteJson(searchValue) {
      return this.routeProvider.getRoute(this.userPosition.latLng, searchValue);
  }

  ///////// Polylines ////////////////////
  showPoly(polyRoute) {
      const decodePolyline = require('decode-google-map-polyline');
      this.arrayPoly = decodePolyline(polyRoute);
      // console.log(decodePolyline(polyRoute));

    this.polyline = this.map.addPolylineSync({
      points: this.arrayPoly,
      color: '#258c3d',
      width: 5,
      geodesic: true,
      clickable: true
      // clickable a enlever, DEV PURPOSE ONLY
    })

    /////// route clickable DEV PURPOSE ONLY
    this.polyline.on(GoogleMapsEvent.POLYLINE_CLICK).subscribe((params: any) => {
      let position: LatLng = <LatLng>params[0];
      let markerPoly: Marker = this.map.addMarkerSync({
        position: position,
        title: position.toUrlValue(),
        disableAutoPan: true
      });

      markerPoly.showInfoWindow();
    });

    this.map.moveCamera({
      'target': this.arrayPoly
    });

  }
  sendTrip() {
    this.tripProvider.updateTrip(this.validatedTrip).subscribe(()=>{
      let alert = this.alrtCtrl.create({
        title: 'Trajet enregistré',
        message: 'Votre trajet a été enregistré, les autostoppeurs peuvent maintenant vous envoyer des demandes de prise en charge.',
        buttons: [
          {
            text: "C'est compris !",
          }
        ]
      });
      alert.present();
    })
  }

    // FIN POLY
    // fin route direction

  goToSpecificLocation() {
    let options: GeocoderRequest = {
    address: this.searchValue
    };

    Geocoder.geocode(options)
    .then((results: GeocoderResult[]) => {
      this.destinationILatLng = results[0].position;
      this.markerDestination = this.map.addMarkerSync({
      'position': results[0].position,
      'title': JSON.stringify(results[0].extra.lines),
      icon: {url: this.iconPath,
                size: {
                  width: 32,
                  height: 32
                }
              }
      })
    });

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

  // Show modal for matching request
  showMatchModal() {
    const matchModal = this.modalCtrl.create(RequestModalPage, { matchableUser: this.matchableUser });
    matchModal.present();
  }

  showMatchedUsersPoly(){
    this.driverProvider.getMatchingDriversAround(this.user).subscribe((matchingDrivers) => {
      console.log(matchingDrivers);
      
      if (matchingDrivers.length) {
        for(let i=0; i <= matchingDrivers.length; i++){
          console.log(matchingDrivers[i]);
          
          // this.showPoly(matchingDrivers[i].trip.itinerary);
        }
      }
    });
  }
}
