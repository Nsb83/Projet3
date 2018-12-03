import { Component, ViewChild } from "@angular/core";
import { MenuController, NavController, Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { TabsPage } from "./menu/tabs/tabs";
import { RatingsPage } from "./menu/ratings/ratings";
import { LegalNoticePage } from "./menu/legal-notice/legal-notice";
import { HelpPage } from "./menu/help/help";
import { ContactPage } from "./menu/contact/contact";

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

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    public navCtrl: NavController
  ) {}

  onNavigate(page: any) {
    this.navCtrl.push(page);
  }
}
