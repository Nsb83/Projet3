import { TabsPage } from './../pages/home/connexion/main/menu/tabs/tabs';
import { ConnexionPage } from './../pages/home/connexion/connexion';
import { MainPage } from "./../pages/home/connexion/main/main";
import { HomePage } from "./../pages/home/home";
import { Component, enableProdMode } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { RegisterPage } from "../pages/home/register/register";
import { ChoicePage } from "../pages/home/register/choice/choice";
import { LegalNoticePage } from '../pages/home/connexion/main/menu/legal-notice/legal-notice';
import { LinkingPage } from '../pages/home/connexion/main/map/request-modal/response-modal/linking/linking';
import { MapPage } from '../pages/home/connexion/main/map/map';
import { enableDebugTools } from '@angular/platform-browser';

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      this.rootPage = HomePage;
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
