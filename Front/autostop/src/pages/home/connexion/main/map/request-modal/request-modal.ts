import { ResponseModalPage } from './response-modal/response-modal';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-request-modal',
  templateUrl: 'request-modal.html',
})
export class RequestModalPage {
  matchableUser;


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.matchableUser = this.navParams.get('matchableUser');
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  sendRequest(){
    this.navCtrl.push(ResponseModalPage, { matchableUser : this.matchableUser});
  }

  ionViewDidLoad() {
    console.log(this.matchableUser);
  }

//Couleur d'étoiles dynamiques
  starRate;
  getColor(num){
    if (num < this.matchableUser.rating){
      return '#b6cb4c';
    }
    else return 'grey';
  }

}
