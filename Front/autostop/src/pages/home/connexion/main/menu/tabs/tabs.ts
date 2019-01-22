import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { VehiclePage } from "./vehicle/vehicle";
import { ProfilePage } from "./profile/profile";
import { PedestrianPage } from "./pedestrian/pedestrian"

@Component({
  selector: "page-tabs",
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab1Root = PedestrianPage;
  tab2Root = VehiclePage;
  tab3Root = ProfilePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad TabsPage");
  }


}
