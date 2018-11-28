import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HomePage } from '../pages/home/home';
import { MyApp } from './app.component';
import { AddFavoritePage } from '../pages/add-favorite/add-favorite';
import { ColorsPage } from '../pages/colors/colors';
import { ConnexionPage } from '../pages/connexion/connexion';
import { ContactPage } from '../pages/contact/contact';
import { DistancePage } from '../pages/distance/distance';
import { FavoritesPage } from '../pages/favorites/favorites';
import { FavoritesSbPage } from '../pages/favorites-sb/favorites-sb';
import { GiveRatingPage } from '../pages/give-rating/give-rating';
import { HelpPage } from '../pages/help/help';
import { LegalNoticePage } from '../pages/legal-notice/legal-notice';
import { LinkingPage } from '../pages/linking/linking';
import { LostPasswordPage } from '../pages/lost-password/lost-password';
import { MainPage } from '../pages/main/main';
import { MapPage } from '../pages/map/map';
import { MenuPage } from '../pages/menu/menu';
import { ProfilePage } from '../pages/profile/profile';
import { RatingsPage } from '../pages/ratings/ratings';
import { RegisterPage } from '../pages/register/register';
import { RequestModalPage } from '../pages/request-modal/request-modal';
import { ResponseModalPage } from '../pages/response-modal/response-modal';
import { SearchBarPage } from '../pages/search-bar/search-bar';
import { TabsPage } from '../pages/tabs/tabs';
import { VehiclePage } from '../pages/vehicle/vehicle';






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
