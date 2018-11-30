import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { MainPgae } from .

/**
 * Generated class for the ConnexionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-connexion",
  templateUrl: "connexion.html"
})
export class ConnexionPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ConnexionPage");
  }

  main = MainPage;
}
