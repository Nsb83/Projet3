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

  //Couleur d'étoiles dynamiques
  starRate;
  getColor(num){
    if (num < this.matchableUser.rating){
      return '#b6cb4c';
    }
    else return 'grey';
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
