import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HomePage } from '../pages/home/home';
import { MyApp } from './app.component';
import { AddFavoritePage } from '../pages/home/connexion/main/menu/tabs/favorites/add-favorite/add-favorite';
import { ColorsPage } from '../pages/home/connexion/main/menu/tabs/vehicle/colors/colors';
import { ConnexionPage } from '../pages/home/connexion/connexion';
import { ContactPage } from '../pages/home/connexion/main/menu/contact/contact';
import { DistancePage } from '../pages/home/connexion/main/menu/tabs/profile/distance/distance';
import { FavoritesPage } from '../pages/home/connexion/main/menu/tabs/favorites/favorites';
import { FavoritesSbPage } from '../pages/home/connexion/main/map/search-bar/favorites-sb/favorites-sb';
import { GiveRatingPage } from '../pages/home/connexion/main/map/request-modal/response-modal/linking/give-rating/give-rating';
import { HelpPage } from '../pages/home/connexion/main/menu/help/help';
import { LegalNoticePage } from '../pages/home/connexion/main/menu/legal-notice/legal-notice';
import { LinkingPage } from '../pages/home/connexion/main/map/request-modal/response-modal/linking/linking';
import { LostPasswordPage } from '../pages/home/lost-password/lost-password';
import { MainPage } from '../pages/home/connexion/main/main';
import { MapPage } from '../pages/home/connexion/main/map/map';
import { MenuPage } from '../pages/home/connexion/main/menu/menu';
import { ProfilePage } from '../pages/home/connexion/main/menu/tabs/profile/profile';
import { RatingsPage } from '../pages/home/connexion/main/menu/ratings/ratings';
import { RegisterPage } from '../pages/home/register/register';
import { RequestModalPage } from '../pages/home/connexion/main/map/request-modal/request-modal';
import { ResponseModalPage } from '../pages/home/connexion/main/map/request-modal/response-modal/response-modal';
import { SearchBarPage } from '../pages/home/connexion/main/map/search-bar/search-bar';
import { TabsPage } from '../pages/home/connexion/main/menu/tabs/tabs';
import { VehiclePage } from '../pages/home/connexion/main/menu/tabs/vehicle/vehicle';






@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddFavoritePage,
    ColorsPage,
    ConnexionPage,
    ContactPage,
    DistancePage,
    FavoritesPage,
    FavoritesSbPage,
    GiveRatingPage,
    HelpPage,
    LegalNoticePage,
    LinkingPage,
    LostPasswordPage,
    MainPage,
    MapPage,
    MenuPage,
    ProfilePage,
    RatingsPage,
    RegisterPage,
    RequestModalPage,
    ResponseModalPage,
    SearchBarPage,
    TabsPage,
    VehiclePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddFavoritePage,
    ColorsPage,
    ConnexionPage,
    ContactPage,
    DistancePage,
    FavoritesPage,
    FavoritesSbPage,
    GiveRatingPage,
    HelpPage,
    LegalNoticePage,
    LinkingPage,
    LostPasswordPage,
    MainPage,
    MapPage,
    MenuPage,
    ProfilePage,
    RatingsPage,
    RegisterPage,
    RequestModalPage,
    ResponseModalPage,
    SearchBarPage,
    TabsPage,
    VehiclePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
