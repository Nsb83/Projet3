import { MainPage } from './../../../../../main';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-give-rating',
  templateUrl: 'give-rating.html',
})
export class GiveRatingPage {
  main = MainPage;
  matchableUser;
  rating = 0;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.matchableUser = this.navParams.get('matchableUser');
  }

// test variables
testTrip: string = "Chemin de la Plaine, Thurins";
comment;
starUrl = "./assets/imgs/stars/starEmptySm.png";

evaluate() {
  this.navCtrl.pop();
}

  rate(index: number) {
    this.rating = index;
    this.getStar(index)
    // function used to change the value of our rating
    // triggered when user, clicks a star to change the rating
 }

   //Couleur d'étoiles dynamiques
  getStar(index: number){
    if (index <= this.rating){
      return this.starUrl= "./assets/imgs/stars/starFullSm.png";
    }
    else return this.starUrl= "./assets/imgs/stars/starEmptySm.png";
  }

  isAboveRating(index: number): boolean {
    return index > this.rating;
    // returns whether or not the selected index is above ,the current rating
    // function is called from the getColor function.
  }
  getColor(index: number) {
    if (this.isAboveRating(index)){
      return "./assets/imgs/stars/starFullSm.png";
    }
    else return "./assets/imgs/stars/starEmptySm.png";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GiveRatingPage');
  }

}
