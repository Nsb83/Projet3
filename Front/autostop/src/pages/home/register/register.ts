import { Component, OnInit } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { ConnexionPage } from "../connexion/connexion";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage implements OnInit {
  connexion = ConnexionPage;

  private register: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.register = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: [""],
      phone: [""],
      sex: [""],
      dateOfBirth: [""],
      mail: [""],
      password: [""]
    });
  }
}
