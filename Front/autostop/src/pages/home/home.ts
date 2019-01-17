import { MainPage } from "./connexion/main/main";
import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { RegisterPage } from "./register/register";
import { ConnexionPage } from "./connexion/connexion";
import { MenuPage } from "./connexion/main/menu/menu";
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

  main = MainPage;
  register = RegisterPage;
  connexion = ConnexionPage;
  menu = MenuPage;


ngOnInit() {
  if(this.tokenStorage.getToken() != null) {
    this.userService.getUserId();
    this.navCtrl.push(ChoicePage);
  }

}

}