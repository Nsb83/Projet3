import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { MainPage } from '../../connexion/main/main';
import { DriverInfosPage } from '../driver-infos/driver-infos';
import { UserProvider } from '../../../../providers/user/userProvider';

@Component({
  selector: 'page-choice',
  templateUrl: 'choice.html',
})
export class ChoicePage {

  private main = MainPage;
  private driverInfos = DriverInfosPage;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userService: UserProvider,
              private alertCtrl: AlertController) {
  }

  chooseDriverMode() {
    this.userService.setDriverProfile();
    let alert = this.alertCtrl.create({
      title:
        "Mode conducteur choisi : isDriver = " +
        this.userService.getDriverProfile() +
        ", isPedestrian = " +
        this.userService.getPedestrianProfile(),
      buttons: ["Ok"]
    });
    alert.present();
    this.navCtrl.push(this.driverInfos);
  }

  choosePedestrianMode() {
    this.userService.setPedestrianProfile();
    this.navCtrl.push(this.main);

// ************************************
// FOR DEVELOPMENT PURPOSES ONLY
// ************************************
    let alert = this.alertCtrl.create({
      title:
        "Mode piéton choisi : isDriver = " +
        this.userService.getDriverProfile() +
        ", isPedestrian = " +
        this.userService.getPedestrianProfile(),
      buttons: ["Ok"]
    });
    alert.present();
// ************************************
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoicePage');
  }

}
