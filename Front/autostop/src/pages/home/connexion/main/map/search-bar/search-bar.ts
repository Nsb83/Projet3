import { Component } from "@angular/core";
import { NavController, NavParams, MenuController } from "ionic-angular";

/**
 * Generated class for the SearchBarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-search-bar",
  templateUrl: "search-bar.html"
})
export class SearchBarPage {
  public searchValue: string; //variable for searchbar input

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController
  ) {}
  //retrieve input value from searchbar
  submitSearch(searchValue) {
    this.searchValue = searchValue;
    console.log(this.searchValue);
  }
  //retrieve input value from searchbar end
  ionViewDidLoad() {
    console.log("ionViewDidLoad SearchBarPage");
  }
  onToggleMenu() {
    this.menuCtrl.open();
  }
}
