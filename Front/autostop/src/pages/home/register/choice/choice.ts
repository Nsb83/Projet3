import { Driver } from './../../../../models/Driver';
import { DriverProvider } from './../../../../providers/driver/driverProvider';
import { MessageProvider } from './../../../../providers/Messages/MessageProvider';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { MainPage } from '../../connexion/main/main';
import { UserProvider } from '../../../../providers/user/userProvider';
import { DriverInfosPage } from '../driver-infos/driver-infos';

@Component({
  selector: 'page-choice',
  templateUrl: 'choice.html',
})
export class ChoicePage {

  private main = MainPage;
  private driveInfosPage = DriverInfosPage;
  private driverInfos: Driver;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userService: UserProvider,
              private driverProvider: DriverProvider,
              private alertCtrl: AlertController,
              private messageService: MessageProvider
              ) {
  }

  chooseDriverMode() {
    this.userService.setIsVehiculed(true);
    this.driverInfos = this.driverProvider.getDriver();
    if(this.driverInfos == null){
      this.navCtrl.push(this.driveInfosPage);
    }
    else {
    this.navCtrl.push(this.main);
    this.messageService.myAlertMethod("Bienvenue !", "Vous êtes désormais connecté en tant que conducteur. Recherchez votre trajet et prennez du monde sur votre trajet.", false);
    }
  }

  choosePedestrianMode() {
    this.userService.setIsVehiculed(false);
    this.messageService.myAlertMethod("Bienvenue !", "Vous êtes désormais connecté en tant que pieton. Enregistrez votre destination pour trouver les conducteur autour de vous.", false)
    this.navCtrl.push(this.main);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoicePage');
  }

}
