import { GiveRatingPage } from './give-rating/give-rating';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-linking',
  templateUrl: 'linking.html',
})
export class LinkingPage {
  matchableUser;
  car = {
    model: "Clio 3 Initiale",
    color: "noire",
    brand: "Renault",
    imgCar: "./assets/imgs/clio4.jpeg"
  }

  testRating: number = 4;

  //Couleur d'étoiles dynamiques
  getStar(num){
    if (num< this.testRating){
      return "./assets/imgs/stars/starFullSm.png";
    }
    else return "./assets/imgs/stars/starEmptySm.png";
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.matchableUser = this.navParams.get('matchableUser');
  }

  //Couleur d'étoiles dynamiques
  starRate;
  getColor(num){
    if (num < this.matchableUser.rating){
      return '#b6cb4c';
    }
    else return 'grey';
  }

  goToRate(){
    this.navCtrl.push(GiveRatingPage, { matchableUser : this.matchableUser});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LinkingPage');
  }

}
