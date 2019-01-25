import { GiveRatingPage } from "./give-rating/give-rating";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { DriverProvider } from "../../../../../../../../providers/driver/driverProvider";
import { Driver } from "../../../../../../../../models/Driver";
// import { CallNumber } from "@ionic-native/call-number";

@Component({
  selector: "page-linking",
  templateUrl: "linking.html"
})
export class LinkingPage {
  matchableUser;

  driver: Driver;
  testRating: number = 4;

  //Couleur d'étoiles dynamiques
  getStar(num) {
    if (num < this.testRating) {
      return "./assets/imgs/stars/starFullSm.png";
    } else return "./assets/imgs/stars/starEmptySm.png";
  }

  constructor(
    // public callNumber: CallNumber,
    public navCtrl: NavController,
    public navParams: NavParams,
    public driverProvider: DriverProvider
  ) {
    this.matchableUser = this.navParams.get("matchableUser");
  }

  ngOnInit() {
    this.driver = this.driverProvider.getDriver();
  }

  //Couleur d'étoiles dynamiques
  starRate;
  getColor(num) {
    if (num < this.matchableUser.rating) {
      return "#b6cb4c";
    } else return "grey";
  }

  goToRate() {
    this.navCtrl.pop();
    this.navCtrl.push(GiveRatingPage, { matchableUser: this.matchableUser });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LinkingPage");
  }

  call() {
    setTimeout(() => {
      let tel = "12345678890";
      window.open(`tel:${tel}`, "_system");
    }, 100);
  }
}
