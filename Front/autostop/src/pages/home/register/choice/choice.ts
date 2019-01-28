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
  private driver: Driver = new Driver();
  private user:User;
  private updatedUser:User;

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
      this.updatedUser = new User (
      this.user.getLastName(),
      this.user.getFirstName(),
      this.user.getPhone(),
      this.user.getSex(),
      this.user.getDateOfBirth(),
      this.user.getEmail(),
      this.user.getPassword(),
      true,
      this.user.getPublicId(),
    )
    this.driverProvider.getDriver().subscribe((response: any) => {
      this.driver = response.driver;
      console.log(this.driver);
    });
    this.userService.updateUser(this.updatedUser).subscribe(() => {
      console.log(this.updatedUser)
      console.log(this.driver.model)
      if(this.driver.model == null){
        this.navCtrl.push(this.driveInfosPage);
      }
      else {
        this.navCtrl.push(this.main);
        this.messageService.myToastMethod("Vous êtes désormais connecté en tant que conducteur.");
      }
    });
  }

  choosePedestrianMode() {
    this.updatedUser = new User (
      this.user.getLastName(),
      this.user.getFirstName(),
      this.user.getPhone(),
      this.user.getSex(),
      this.user.getDateOfBirth(),
      this.user.getEmail(),
      this.user.getPassword(),
      false,
      this.user.getPublicId(),
    )
    this.userService.updateUser(this.updatedUser).subscribe(() => {
      this.messageService.myToastMethod("Vous êtes désormais connecté en tant que piéton.")
      this.navCtrl.push(this.main);
    });
  }

}
