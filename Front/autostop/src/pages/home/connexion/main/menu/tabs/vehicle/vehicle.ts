import { Driver } from './../../../../../../../models/Driver';
import { Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../../../../../../providers/user/user';

@Component({
  selector: 'page-vehicle',
  templateUrl: 'vehicle.html',
})
export class VehiclePage implements OnInit{

  private driverInfos: Driver;
  private register: FormGroup;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private alertCtrl: AlertController,
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
    console.log(this.driverInfos)
//     this.userService.createUser(this.newUser);
//     this.navCtrl.push(ChoicePage);

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
