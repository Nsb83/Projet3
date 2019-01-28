import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { TokenStorage } from "../../providers/auth/token.storage";
import { UserProvider } from "../../providers/user/userProvider";
import { ChoicePage } from "./register/choice/choice";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements OnInit {
  constructor(
    public navCtrl: NavController,
    public tokenStorage: TokenStorage,
    public userService: UserProvider
  ) {}

  ngOnInit() {
    if (this.tokenStorage.getToken() != null) {
      this.userService.getUserId();
      this.navCtrl.push(ChoicePage);
    }
  }
}
