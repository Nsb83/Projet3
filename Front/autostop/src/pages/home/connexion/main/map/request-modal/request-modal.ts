import { ResponseModalPage } from './response-modal/response-modal';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-request-modal',
  templateUrl: 'request-modal.html',
})
export class RequestModalPage {
  matchableUser;
  // matchableUser = {
  //   name : "Gérard",
  //   surname : "Darmon",
  //   destination : "6 Le Rampeau, 69510 THURINS"
  // };

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.matchableUser = this.navParams.get('matchableUser');
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  sendRequest(){
    this.navCtrl.push(ResponseModalPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestModalPage');
  }

  rating;
  COLORS = {
    GREY : "E0E0E0",
    GREEN : "#76FF03",
    YELLOW : "#FFCA28",
    RED : "#DD2C00"
  };
  rate(index: number) {
    this.rating = this.matchableUser.rate;
    // function used to change the value of our rating
    // triggered when user, clicks a star to change the rating
 }
  getColor(index: number) {
    if (this.isAboveRating(this.matchableUser.rate)){
      return this.COLORS.GREY;
    }
    switch (this.matchableUser.rate) {
      case 1 :
      case 2 :
        return this.COLORS.RED;
      case 3:
        return this.COLORS.YELLOW;
      case 4:
      case 5:
        return this.COLORS.GREEN;
      default :
        return this.COLORS.GREY;
    }
  }
  isAboveRating(index: number): boolean {
    return index > this.matchableUser.rate ;
    // returns whether or not the selected index is above ,the current rating
    // function is called from the getColor function.
  }

}
