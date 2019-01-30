import { UserProvider } from './../../../../../providers/user/userProvider';
import { RouteProvider } from './../../../../../providers/route/route';
import { User } from './../../../../../models/User';
import { RequestModalPage } from './request-modal/request-modal';
import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, ModalController, Events } from 'ionic-angular';
import { Trip } from '../../../../../models/Trip';
import { MessageProvider } from '../../../../../providers/Messages/MessageProvider';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
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
  MarkerOptions
} from "@ionic-native/google-maps";
import { TripProvider } from '../../../../../providers/trip/trip';
import { DriverProvider } from '../../../../../providers/driver/driverProvider';
import { MatchingUserDetails } from '../../../../../models/MatchingUserDetails';
import { Observable } from 'rxjs';
import { PedestrianProvider } from '../../../../../providers/Pedestrian/PedestrianProvider';
import { takeWhile } from 'rxjs/operators';
import { ResponseModalPage } from './request-modal/response-modal/response-modal';
import { MatchProvider } from '../../../../../providers/match/matchProvider';
import { MatchingEntity } from '../../../../../models/MatchingEntity';
@Component({
  selector: "page-map",
  templateUrl: "map.html"
})

export class MapPage {
  map: GoogleMap;
  inputSearch: String;
  userPosition: MyLocation;
  searchValue: any;
  polyline: Polyline;
  markerDestination : Marker;
  iconPath: String;
  arrayPoly: LatLng[];
  validatedTrip: Trip;
  destinationILatLng: ILatLng;
  user: User;
  polyMatch: Polyline;
  arrayPolyMatched = [];
  userChanged: boolean = false;
  pollingPedestrians: any;
  requestingMatchingEntities: MatchingEntity[];
  modalShowed: boolean = false;
  option: MyLocationOptions = {
    enableHighAccuracy: true
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public routeProvider: RouteProvider,
              public messageProvider: MessageProvider,
              public alrtCtrl: AlertController,
              public userProvider: UserProvider,
              public tripProvider: TripProvider,
              public driverProvider: DriverProvider,
              public events: Events,
              public pedestrianProvider: PedestrianProvider,
              private matchProvider: MatchProvider) {

                events.subscribe('user:changed', () => {
                  this.userChanged = true;
                    this.userProvider.getUser().subscribe(response => {
                    this.user = response;
                  });
                });

                events.subscribe('menu:closed', () => {
                  if (this.userChanged){
                    this.userChanged = false;
                    this.setIconUser();
                    this.map.clear().then(() => {
                      this.map.moveCamera({
                        target: this.userPosition.latLng,
                        zoom: 15
                      });
                     this.addMarkerAndCircle();
                  });
                }
              });

              events.subscribe('user:logout'), () => {
                this.modalShowed = true;
              }

              events.subscribe('request:declined', () => {
                this.modalShowed = false;
                this.sendTrip();
              });
            }


  /**
   * Getting the user at the initialisation of the component.
   */
  ngOnInit(){
    this.userProvider.getUser().subscribe(response => {
      this.user = response;
    });
  }

  /**
   * Loading the map only after the view is initialised.
   */
  ngAfterViewInit() {
    this.loadMap();
  }

  /**
   * Setting the geolocation icon
   */
  ngAfterViewChecked(){
    this.setIconUser();
  }

  /**
   * Unsubscribing to the stream of data from the matching request.
   */
  ngOnDestroy() {
    this.pollingPedestrians.unsubscribe();
  }

  /**
   * Setting the path of the geolocation icon from the vehiculed status of the user we catched at the initialisation.
   */
  setIconUser(){
    if(this.user.isVehiculed()) {
      this.iconPath = "../assets/icon/driver.png";
    }
    else this.iconPath = "../assets/icon/thumb.png";
  }

  /**
   * Creation of the map. It is centered on the geolocation of the user. The marker and circle are called here if needed.
   */
  loadMap() {
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: "AIzaSyBhqCcaN5OfApXOWr_1b2VkIBQqIwPQK44",
      API_KEY_FOR_BROWSER_DEBUG: "AIzaSyBhqCcaN5OfApXOWr_1b2VkIBQqIwPQK44"
    });

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

  /**
   * Creation of a marker on the user position. A circle is added if he is a pedestrian. It have a radius value linked to the search radius attribute of the pedestrian.
   *
   * The marker options set the icon path depending on the vehiculed attribute.
   */
  addMarkerAndCircle() {
        let markerOptions: MarkerOptions;
        if(this.user.isVehiculed()) {
          markerOptions = {
          position: this.userPosition.latLng,
          icon: {url: "../assets/icon/driver.png",
                size: {
                  width: 32,
                  height: 32
                }
              }
            }
        }
        else {
          markerOptions = {
            animation: 'DROP',
            position: this.userPosition.latLng,
            icon: {url: "../assets/icon/thumb.png",
                  size: {
                    width: 53,
                    height: 64
                  }
                }
            }
          }

      let markerGeoloc: Marker = this.map.addMarkerSync(markerOptions);

      if(!this.user.isVehiculed()) {
        let center = this.userPosition.latLng;
        let pedestrian = this.user.getPedestrian();

        let circle: Circle = this.map.addCircleSync({
          center: center,
          radius: pedestrian.searchRadius,
          strokeColor: "#258c3d",
          fillColor: "rgba(239, 244, 225, 0.45)"
        });
      }
    }

  /**
   * Catch the search value from the search bar then :
   *
   * - Get the directions of the trip
   * - A new trip is created from the response, ready to be sent
   * - The drawing of the trip is displayed from the overview polyline
   * - An end trip marker is added
   * @param $event
   */
  receiveMessage($event) {
    this.searchValue = $event;
    this.getRouteJson($event).subscribe(
      (data: any) => {
        if (data.status === "OK") {
          this.validatedTrip  = new Trip(data.routes[0].legs[0].start_location,
                              data.routes[0].legs[0].end_address,
                              data.routes[0].legs[0].end_location,
                              data.routes[0].overview_polyline.points,
                              );
          this.displayRoute(data.routes[0].overview_polyline.points);
          this.addMarkerAndCircle();
          this.showDestinationMarker();
        } else {
          this.messageProvider.myAlertMethod("Désolé", "Nous n'avons pas trouvé votre adresse de destination...", false);
        }
      });
  }

  /**
   * Call to the google maps direction api.
   *
   * Use the user geolocation Lat & Lng and the search value from the search bar.
   * @param searchValue
   * @returns Json of directions to be used to create a trip
   */
  getRouteJson(searchValue) {
    return this.routeProvider.getRoute(this.userPosition.latLng, searchValue);
  }

  /**
   * Call the display of the user trip on the map.
   *
   * If one or multiples trips are displayed, they are removed with the markers.
   * @param overview_polyline Encoded array of lat lng values defining a trip
   */
  displayRoute(overview_polyline) {
    if (this.polyline !== undefined) {
      this.polyline.remove();
      this.markerDestination.remove();
    }
    if (this.arrayPolyMatched !== null){
      for(let i=0; i <= this.arrayPolyMatched.length -1; i++){
        this.arrayPolyMatched[i].remove();
      }
    }
    this.showPoly(overview_polyline, '#258c3d');
  }

  /**
   * Pass the overview polyline in a decoder. An array of Lat Lng is created, representing the trip.
   *
   * This array is then used to display the trip on the map.
   *
   * The camera is moved to fit the trip on the screen.
   * @param polyRoute overview polyline from google maps direction API
   * @param polyColor color choice for the drawing
   */
  showPoly(polyRoute, polyColor) {
    const decodePolyline = require('decode-google-map-polyline');
    this.arrayPoly = decodePolyline(polyRoute);

    this.polyline = this.map.addPolylineSync({
      points: this.arrayPoly,
      color: polyColor,
      width: 5,
      geodesic: true,
    })

    this.map.moveCamera({
      'target': this.arrayPoly
    });

  }

  /**
   * Put a marker on the destination of the trip with a specific icon.
   */
  showDestinationMarker() {
    let options: GeocoderRequest = {
    address: this.searchValue
    };

    Geocoder.geocode(options)
    .then((results: GeocoderResult[]) => {
      this.destinationILatLng = results[0].position;
      this.markerDestination = this.map.addMarkerSync({
      'position': results[0].position,
      'title': JSON.stringify(results[0].extra.lines),
      icon: {url: "../assets/icon/endTripPin.png",
                size: {
                  width: 50,
                  height: 30
                }
              }
      })
    });
  }

  /**
   * Function called on click to validate the trip.
   *
   * If the user is pedestrian, his trip is updated and he received the matched users to be then displayed with showMatchedUsersPoly.
   *
   * If the user is a driver, he starts listening to the matchings entities on the back.
   * If a pedestrian requested a pick up, his matching entity will be updated.
   * It will then display a modal to accept or decline the pick up and stop the polling.
   */
  sendTrip() {
    this.tripProvider.updateTrip(this.validatedTrip).subscribe(() => {
      if(this.user.isVehiculed()) {
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

        this.modalShowed = false;

        this.pollingPedestrians = Observable.interval(1000)
          .pipe(takeWhile(() => !this.modalShowed))
          .switchMap(() => this.matchProvider.queryPedestrian())
          .subscribe(
            (data: MatchingEntity[]) => {              
              this.requestingMatchingEntities = data;
              if (this.requestingMatchingEntities.length) {
                this.userProvider.getMatchingUserDetails(this.requestingMatchingEntities[0].pedestrianPublicId)
                  .subscribe((matchingPedestrian: MatchingUserDetails) => {
                    
                    console.log(matchingPedestrian);
                    
                    this.showMatchModal(matchingPedestrian, this.requestingMatchingEntities[0]);
                    this.modalShowed = true;
                });
              }
            },
            error => {
              console.log(error);
            });
          }

      else {
        this.messageProvider.myToastMethod("Votre trajet a été enregistré, cherchez maintenant le trajet d'un automobiliste qui vous convient.", 7000);
        this.showMatchedUsersPoly();
      }
    })
  }

  /**
   * Display the response modal where the driver will accept or decline the trip and the pedestrian can cancel it.
   * @param matchUser
   * @param matchingEntity
   */
  showMatchModal(matchUser, matchingEntity) {
    this.navCtrl.push(ResponseModalPage, { matchableUser : matchUser, matchingEntity : matchingEntity });
  }

  /**
   * First remove all the drawed polylines if there are some.
   *
   * Then call the matching function on the back.
   * It will return an array of matching users that will passed to showPolyMatch ti be displayed.
   */
  showMatchedUsersPoly(){
    if (this.arrayPolyMatched !== null){
      for(let i=0; i <= this.arrayPolyMatched.length -1; i++){
        this.arrayPolyMatched[i].remove();
      }
    }

    this.matchProvider.getMatchingDriversAround().subscribe((matchingDrivers: MatchingUserDetails[]) => {
        if (matchingDrivers.length) {
        for(let i=0; i <= matchingDrivers.length -1; i++){
          this.showPolyMatch(matchingDrivers[i].trip.itinerary, '#66245A', matchingDrivers[i]);
          this.arrayPolyMatched[i]=this.polyMatch;
        }
      }
    });
  }

  /**
   * Decode the overview polyline of the trip and display it. Open the match modal if clicked.
   *
   * Camera is moved to fit the trip in the screen.
   * @param polyRoute overview polyline of the trip
   * @param polyColor
   * @param driverInfos matching user data to be passed in the match modal
   */
  showPolyMatch(polyRoute, polyColor, driverInfos) {
    const decodePolyline = require('decode-google-map-polyline');
    this.arrayPoly = decodePolyline(polyRoute);

    this.polyMatch = this.map.addPolylineSync({
      points: this.arrayPoly,
      color: polyColor,
      width: 5,
      geodesic: true,
      clickable: true,
      driverInfos: driverInfos
    })

    this.polyMatch.on(GoogleMapsEvent.POLYLINE_CLICK).subscribe((params: any) => {
      const matchModal = this.modalCtrl.create(RequestModalPage, { matchUser: driverInfos });
      matchModal.present();
    });

    this.map.moveCamera({
      'target': this.arrayPoly
    });
  }

}
