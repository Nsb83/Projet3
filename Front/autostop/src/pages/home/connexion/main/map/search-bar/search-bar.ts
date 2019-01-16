import { Component, EventEmitter, Output } from "@angular/core";
import { NavController, NavParams, MenuController } from "ionic-angular";


@Component({
  selector: "page-search-bar",
  templateUrl: "search-bar.html"
})
export class SearchBarPage {
  
  @Output() searchValueEmit = new EventEmitter<string>();
  searchValue;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController
  ) {}

  //retrieve input value from searchbar
  submitSearch(searchValueParam) {
    this.searchValue = searchValueParam
    this.searchValueEmit.emit(this.searchValue)
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
