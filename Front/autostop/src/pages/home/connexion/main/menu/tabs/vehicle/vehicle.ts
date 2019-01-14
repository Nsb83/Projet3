import { ChoicePage } from './../../../../../register/choice/choice';
import { DriverProvider } from './../../../../../../../providers/driver/driver';
import { Driver } from './../../../../../../../models/Driver';
import { Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../../../../../../providers/user/userProvider';
import { TokenStorage } from '../../../../../../../providers/auth/token.storage';

@Component({
  selector: 'page-vehicle',
  templateUrl: 'vehicle.html',
})
export class VehiclePage implements OnInit{

  private driverInfos: Driver;
  private register: FormGroup;
  private tokenId;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private alertCtrl: AlertController,
              private driverProvider: DriverProvider,
              private token: TokenStorage,
              private userService: UserProvider) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.register = this.formBuilder.group(
      {
        brand: ["", Validators.required],
        model: ["", Validators.required],
        color: ["", Validators.required],
        licensePlate: ["", Validators.required],
        imgCar: ["", Validators.required],

      },
      // { validator: this.passwordControl("password", "passwordConfirmation") }
    );
  }

  validateForm(register) {
    this.driverInfos = new Driver(
      register.licensePlate,
      register.brand,
      register.model,
      register.color,
      register.imgCar,
    );
    console.log(this.driverInfos);
    this.tokenId = this.driverProvider.getToken();
    console.log(this.tokenId);
    this.driverProvider.createDriver(this.driverInfos);
    this.navCtrl.push(ChoicePage);

// // ************************************
// // FOR DEVELOPMENT PURPOSES ONLY
// // ************************************
//     let alert = this.alertCtrl.create({
//       title:
//         "Nouveau compte créé pour " +
//         this.newUser.lastName +
//         ", " +
//         this.newUser.firstName,
//       subTitle:
//         "Tel. : " + this.newUser.phone + ", Mail : " + this.newUser.mail,
//       buttons: ["Ok"]
//     });
//     alert.present();
// // ************************************

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VehiclePage');
  }

}
