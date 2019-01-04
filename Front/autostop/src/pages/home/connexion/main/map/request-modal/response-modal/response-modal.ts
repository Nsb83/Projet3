import { LinkingPage } from './linking/linking';
import { MapPage } from './../../map';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-response-modal',
  templateUrl: 'response-modal.html',
})
export class ResponseModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.matchableUser = this.navParams.get('matchableUser');
  }

  matchableUser;

  // test variables
  testTrip: string = "Chemin de la Plaine, Thurins";
  testImgUrl: string = "../../../../assets/imgs/profileImg.jpg";
  testRating: number = 4;

  //Couleur d'étoiles dynamiques
  getStar(num){
    if (num< this.testRating){
      return "./assets/imgs/stars/starFullSm.png";
    }
    else return "./assets/imgs/stars/starEmptySm.png";
  }

  goToLinking(){
    this.navCtrl.push(LinkingPage, { matchableUser : this.matchableUser});
  }

  cancelRequest(){
    this.navCtrl.push(MapPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResponseModalPage');
  }

}
