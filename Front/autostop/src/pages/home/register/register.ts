import { Component, OnInit } from "@angular/core";
import { NavController, NavParams, AlertController } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { MainPage } from "../connexion/main/main";
import { User } from "../../../models/User";

@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage implements OnInit {

  main = MainPage;
  newUser: User;

  private register: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.register = this.formBuilder.group({
      lastName: ["", Validators.required],
      firstName: ["", Validators.required],
      phone: ["", Validators.required],
      mail: ["", Validators.required],
      sex: ["", Validators.required],
      dateOfBirth: ["", Validators.required],
      password: ["", Validators.required],
      passwordConfirmation : ["", Validators.required]
    });    
  }

  validateForm(register){
    this.newUser = new User(register.lastName, register.firstName, register.phone, register.mail, register.sex, register.dateOfBirth);
    let alert = this.alertCtrl.create({
      title: 'Nouveau compte créé pour ' + this.newUser.lastName + ", " + this.newUser.firstName,
      subTitle: "Tel. : " + this.newUser.phone + ", Mail : " + this.newUser.mail,
      buttons: ['Ok']

    });
    alert.present();
    this.navCtrl.push(MainPage);
  }

}
