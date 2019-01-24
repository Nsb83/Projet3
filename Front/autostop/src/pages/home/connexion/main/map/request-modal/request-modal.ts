import { ResponseModalPage } from './response-modal/response-modal';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { PedestrianProvider } from '../../../../../../providers/Pedestrian/PedestrianProvider';

@Component({
  selector: 'page-request-modal',
  templateUrl: 'request-modal.html',
})
export class RequestModalPage {
  matchableUser;

  // test variables
  testTrip: string = "Chemin de la Plaine, Thurins";
  testRating: number = 4;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private pedestrianProvider: PedestrianProvider) {
    this.matchableUser = this.navParams.get('matchUser');
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  sendRequest(){
    this.viewCtrl.dismiss();
    this.navCtrl.push(ResponseModalPage, { matchableUser : this.matchableUser});
    this.pedestrianProvider.sendRequest(this.matchableUser.publicId);
  }

  ionViewDidLoad() {
    console.log(this.matchableUser);
  }

//Couleur d'étoiles dynamiques
  getStar(num){
    if (num< this.testRating){
      return "./assets/imgs/stars/starFullSm.png";
    }
    else return "./assets/imgs/stars/starEmptySm.png";
  }

}
