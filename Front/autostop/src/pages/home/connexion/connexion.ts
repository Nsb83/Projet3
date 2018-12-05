import { Component, OnInit } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { MainPage } from "./main/main";
import { LostPasswordPage } from "../lost-password/lost-password";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "page-connexion",
  templateUrl: "connexion.html"
})
export class ConnexionPage implements OnInit {
  main = MainPage;
  lostPasswordPage = LostPasswordPage;

  private connexion: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.connexion = this.formBuilder.group({
      email: ["", Validators.required],
      password: [""]
    });
  }

  onNavigate2(page) {
    this.navCtrl.push(page);
  }
}
