import { MainPage } from "./connexion/main/main";
import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { RegisterPage } from "./register/register";
import { ConnexionPage } from "./connexion/connexion";
import { MenuPage } from "./connexion/main/menu/menu";

// import to test timer
import { TimerPage } from "./connexion/main/map/request-modal/timer/timer";
// import to test timer

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(public navCtrl: NavController) {}
  timer = TimerPage;
  main = MainPage;
  register = RegisterPage;
  connexion = ConnexionPage;
  menu = MenuPage;
}
