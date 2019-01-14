import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

// ***************************************
//        IMPORTS DES PAGES IONIC 
// ***************************************
import { HomePage } from "../pages/home/home";
import { MyApp } from "./app.component";
import { AddFavoritePage } from "../pages/home/connexion/main/menu/tabs/favorites/add-favorite/add-favorite";
import { ConnexionPage } from "../pages/home/connexion/connexion";
import { ContactPage } from "../pages/home/connexion/main/menu/contact/contact";
import { DistancePage } from "../pages/home/connexion/main/menu/tabs/profile/distance/distance";
import { FavoritesPage } from "../pages/home/connexion/main/menu/tabs/favorites/favorites";
import { FavoritesSbPage } from "../pages/home/connexion/main/map/search-bar/favorites-sb/favorites-sb";
import { GiveRatingPage } from "../pages/home/connexion/main/map/request-modal/response-modal/linking/give-rating/give-rating";
import { HelpPage } from "../pages/home/connexion/main/menu/help/help";
import { LegalNoticePage } from "../pages/home/connexion/main/menu/legal-notice/legal-notice";
import { LinkingPage } from "../pages/home/connexion/main/map/request-modal/response-modal/linking/linking";
import { LostPasswordPage } from "../pages/home/lost-password/lost-password";
import { MainPage } from "../pages/home/connexion/main/main";
import { MapPage } from "../pages/home/connexion/main/map/map";
import { MenuPage } from "../pages/home/connexion/main/menu/menu";
import { ProfilePage } from "../pages/home/connexion/main/menu/tabs/profile/profile";
import { RatingsPage } from "../pages/home/connexion/main/menu/ratings/ratings";
import { RegisterPage } from "../pages/home/register/register";
import { RequestModalPage } from "../pages/home/connexion/main/map/request-modal/request-modal";
import { ResponseModalPage } from "../pages/home/connexion/main/map/request-modal/response-modal/response-modal";
import { SearchBarPage } from "../pages/home/connexion/main/map/search-bar/search-bar";
import { TabsPage } from "../pages/home/connexion/main/menu/tabs/tabs";
import { VehiclePage } from "../pages/home/connexion/main/menu/tabs/vehicle/vehicle";
import { ChoicePage } from "../pages/home/register/choice/choice";


import { GoogleMaps } from "@ionic-native/google-maps";
import { DriverInfosPage } from "../pages/home/register/driver-infos/driver-infos";
import { UserProvider } from '../providers/user/userProvider';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { EmailComposer } from '@ionic-native/email-composer';
import { RouteProvider } from '../providers/route/route';
import { TokenInterceptor } from "./http-interceptors/token-interceptor";
import { AuthService } from '../providers/auth/auth.service';
import { TokenStorage } from '../providers/auth/token.storage'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddFavoritePage,
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
    VehiclePage,
    ChoicePage,
    DriverInfosPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, { tabsPlacement: "top" })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddFavoritePage,
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
    VehiclePage,
    ChoicePage,
    DriverInfosPage
  ],
  providers: [
    StatusBar,
    AuthService,
    SplashScreen,
    EmailComposer,
    GoogleMaps,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserProvider,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    TokenStorage,
    RouteProvider
  ]
})
export class AppModule {}
