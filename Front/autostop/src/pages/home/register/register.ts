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
      sex: ["", Validators.required],
      dateOfBirth: ["", Validators.required],
      mail: ["", Validators.required, Validators.email],
      password: ["", Validators.required, Validators.min(8), Validators.max(16)],
      passwordConfirmation : ["", Validators.required]
    });    
  }

  validateForm(){
    User newUser = new User(lastName.value, firstName.value, phone.value, sex.value, mail.value, dateOfBirth.value);
    let alert = this.alertCtrl.create({
      title: 'Nouveau compte crée pour',
      subTitle: 'Nom :' + this.firstName,
      buttons: ['Ok']
    });
    alert.present();
  }
}
