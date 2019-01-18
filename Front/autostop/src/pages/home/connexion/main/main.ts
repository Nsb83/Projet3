import { Component, ViewChild } from "@angular/core";
import { MenuController, NavController, Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { TabsPage } from "./menu/tabs/tabs";
import { RatingsPage } from "./menu/ratings/ratings";
import { LegalNoticePage } from "./menu/legal-notice/legal-notice";
import { HelpPage } from "./menu/help/help";
import { ContactPage } from "./menu/contact/contact";
import { User } from "../../../../models/User";
import { UserProvider } from "../../../../providers/user/userProvider";
import { TokenStorage } from '../../../../providers/auth/token.storage';
import { HomePage } from "../../home";
import { MessageProvider } from "../../../../providers/Messages/MessageProvider";

@Component({
  selector: "page-main",
  templateUrl: "main.html"
})
export class MainPage {
  tabsPage: any = TabsPage;
  ratingsPage: any = RatingsPage;
  legalNoticePage = LegalNoticePage;
  helpPage = HelpPage;
  contactPage = ContactPage;

  user: User;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    public navCtrl: NavController, 
    private userService: UserProvider,
    private token: TokenStorage,
    private messageService: MessageProvider
  ) { }

  ngOnInit() {
    this.userService.getUser().subscribe(response => { this.user = response });
  }

  ionViewWillEnter() {
  this.userService.getUser().subscribe(response => { this.user = response });
  }

  onNavigate(page: any) {
    this.navCtrl.push(page);
  }

  SignOut() {
    this.token.signOut();
    this.messageService.myToastMethod("Au revoir !, Vous êtes désormais déconnecté")
    this.navCtrl.setRoot(HomePage);
    }
}
