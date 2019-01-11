import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { FavoritesPage } from "./favorites/favorites";
import { VehiclePage } from "./vehicle/vehicle";
import { ProfilePage } from "./profile/profile";

@Component({
  selector: "page-tabs",
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab1Root = FavoritesPage;
  tab2Root = VehiclePage;
  tab3Root = ProfilePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad TabsPage");
  }


}
