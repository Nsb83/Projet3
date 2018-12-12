import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MainPage } from '../../connexion/main/main';
import { DriverInfosPage } from '../driver-infos/driver-infos';

@Component({
  selector: 'page-choice',
  templateUrl: 'choice.html',
})
export class ChoicePage {

  private main = MainPage;
  private driverInfos = DriverInfosPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  chooseDriverMode() {
    
    this.navCtrl.push(this.driverInfos);
  }

  choosePedestrianMode() {
    this.navCtrl.push(this.main);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoicePage');
  }

}
