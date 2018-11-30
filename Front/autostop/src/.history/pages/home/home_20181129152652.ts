import { MainPage } from "./connexion/main/main";
import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { RegisterPage } from ""

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(public navCtrl: NavController) {}

  main = MainPage;
  register = RegisterPage;
}
