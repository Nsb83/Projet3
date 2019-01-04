import { RouteProvider } from './../../../../../providers/route/route';
import { Trip } from './../../../../../models/Trip';
import { User } from './../../../../../models/User';
import { GiveRatingPage } from './request-modal/response-modal/linking/give-rating/give-rating';
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

  ratingPage = GiveRatingPage;

  // Test data for request-modal
  // matchableUser : User = {
  //   lastName: "John",
  //   firstName: "Doe",
  //   phone: "08 36 65 65 65",
  //   mail: "gegedarmon@yahoo.fr",
  //   imgUrl: "./assets/imgs/darmon.jpg",
  //   sex: "male",
  //   dateOfBirth: "29/02/1948",


  // };

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
      console.log(location);
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
        title: "Ma position",
        icon: {url: "../assets/icon/thumb.png",
              size: {
                width: 32,
                height: 32
              }
            }
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
        strokeColor: "#258c3d",
        // strokeWidth: 30, A QUOI CA SERT???
        fillColor: "rgba(239, 244, 225, 0.45)"
      });
      this.map.moveCamera({
        target: circle.getBounds
      });
    });



  }
  routeJson : any;

  displayRouteJson(){
    this.showPoly(this.routeJson);

    console.log(this.routeJson)
  }
  showRoute(searchValue){

    let option: MyLocationOptions = {
      enableHighAccuracy: true
    };
    LocationService.getMyLocation(option).then((location: MyLocation) => {
      this.RouteProvider.getRoute(location.latLng, searchValue).subscribe((data: any)=>
        this.routeJson = data.routes[0].overview_polyline.points);
    });

  };
  ///////// Polylines ////////////////////
  showPoly(polyRoute){
      const decodePolyline = require('decode-google-map-polyline');
      // let polylineOverview = '{yevGgwm\\kB{APk@hAmDxBhB\\?hCzATFrIbH~n@|g@zIjH`JjHdF|DZPhALl@I|As@nAo@f@MzA]xJkBhPwCvK}A|HgA|Cs@~Ak@jIoDtK}E`DgBfDiC|CcDzAsBvA}BzCkGvEeMbBkDbAwA~BeCfKuJrQ_Q`BkArAo@rAa@p@OzH_Ar@AtCOpCJ|Bj@lBbAfAdAp@|@l@`AXVjChHdC|Ih@tBvGtXbAtFbBdItE`QhEjNtFvOlF~MjOl]|CdIrFfOt^lbA|IfVtDbL`DrLdEdSxEpWrF|Z~A~IdAbFlB~I~AtFlBnF|AfDzAlCtAtBlCdDjDdDtBzAhBfAtBjAr@h@pAvAbAdBn@|AjBrF|AvDfBnEzD|LXfAbAtC|@`Bj@x@p@l@z@f@hA^lAN~Jx@|Ir@v@DLBDCVFhHfEKtAQbBc@zDI`FGh@Yx@KXEh@FxBEp@M^oAhBm@|@eA~@c@Vo@l@_@d@eAtB[Tu@LoACkAHoAVeAZcA|@e@t@Qb@Ih@YbE]dDc@~BKvAMxDMfAMdDFvATjCCz@YjA}@pDCl@HhATjCDzACdDEbABr@TxEGd@Od@}@vBm@vDB`ANz@@`BMhBIfCIvAQdAs@pCc@fAe@t@Id@E~ADj@L\\TTd@Jh@@|@G|Df@f@X\\XBbAEPEt@QhBA~@EbEgC]eAr@g@h@]n@a@pAQPa@R{@Vc@Xq@v@Uj@Mj@QxAg@|BUt@}@bBwA|Cm@hB}A`Gq@pBMx@YbAq@zAe@j@y@~@k@nC_@bAUlAQ~ACfAPbDTfEGnAUz@]v@Y`B]v@Yf@WjA]z@aAt@}@TiA?yB?sCX}@?q@Go@XqE~FeAtBu@rB{@fDYlAURU?_@OWEWG[Ka@B[F_@?c@Qc@m@cB{Cq@w@e@w@CMQMKBIJC\\BHGnAMtAMr@[t@aAfAY\\Sd@]vAg@bBSnAOx@]`Ac@v@q@lCOf@m@lA{@hAaCxB{@~@_@f@ECK?GDITAP@FOrAi@fCi@xCW|CKhDBnBJ~D^|DRrB@h@KfGc@nRU`LBnAHr@bAvEVlBDxBQrEEnIA|CN|CEhEa@|GKzB@dDJtANnBAl@E`@]v@kAjDg@~B_@|DQhGH~H`@fHGt@QVKVSn@QAOHIXBd@Dn@Ad@NvAHvCI`Ao@nDWtBM~B?nCBdDCjCUhCSfAI`AFX`@jA\\~@ARBdAEpGA\\IAKFcBbDyApA}@hA]hAw@fFa@pC}@bCqAfC_AnA_BnAsAhB[v@s@Nk@To@F{Bs@qBaA?i@k@cBeAwBQY';
      let polylineOverview = polyRoute;
      let arrayPoly = decodePolyline(polylineOverview);
      console.log(decodePolyline(polylineOverview));

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
    const matchModal = this.modalCtrl.create(RequestModalPage, { });
    matchModal.present();
  }


  searchValue;
  receiveMessage($event) {
    this.searchValue = $event
    console.log(this.searchValue)
    this.showRoute(this.searchValue);
  }
  goToSpecificLocation(){
    let options: GeocoderRequest = {
    address: this.searchValue
    // Marche avec plus d'infos genre '6 Le Rampeau, 69510, Thurins, FRANCE'
    };
    // Address -> latitude,longitude
    Geocoder.geocode(options)
    .then((results: GeocoderResult[]) => {
    console.log(results);

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
