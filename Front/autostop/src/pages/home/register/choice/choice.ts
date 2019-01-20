import { Driver } from './../../../../models/Driver';
import { DriverProvider } from './../../../../providers/driver/driverProvider';
import { MessageProvider } from './../../../../providers/Messages/MessageProvider';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { MainPage } from '../../connexion/main/main';
import { UserProvider } from '../../../../providers/user/userProvider';
import { DriverInfosPage } from '../driver-infos/driver-infos';
import { User } from '../../../../models/User';

@Component({
  selector: 'page-choice',
  templateUrl: 'choice.html',
})
export class ChoicePage {

  private main = MainPage;
  private driveInfosPage = DriverInfosPage;
  private driverInfos: Driver;
  private user:User;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userService: UserProvider,
              private driverProvider: DriverProvider,
              private alertCtrl: AlertController,
              private messageService: MessageProvider
              ) {
  }

  ngOnInit() {
    this.userService.getUser().subscribe(response => {this.user = response});

      setTimeout(() =>
      this.messageService.myToastMethod(`Bonjour ${this.user.getFirstName()}, vous êtes désormais connecté !`), 300)
      };
  

  chooseDriverMode() {
    this.userService.setIsVehiculed(true);
    this.driverInfos = this.driverProvider.getDriver();
    if(this.driverInfos == null){
      this.navCtrl.push(this.driveInfosPage);
    }
    else {
      this.navCtrl.push(this.main);
      this.messageService.myToastMethod("Vous êtes désormais connecté en tant que conducteur.");
    }
  }

  choosePedestrianMode() {
    this.userService.setIsVehiculed(false);
    this.messageService.myToastMethod("Vous êtes désormais connecté en tant que piéton.")
    this.navCtrl.push(this.main);
  }

  ionViewDidLoad() {

  }

}
