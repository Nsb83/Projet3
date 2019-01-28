import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { MyApp } from "./app.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { GoogleMaps } from "@ionic-native/google-maps";
import { TokenInterceptor } from "./http-interceptors/token-interceptor";
import { EmailComposer } from "@ionic-native/email-composer";


// ***************************************
//        IMPORTS DES PAGES IONIC
// ***************************************

import { HomePage } from "../pages/home/home";
import { ConnexionPage } from "../pages/home/connexion/connexion";
import { ContactPage } from "../pages/home/connexion/main/menu/contact/contact";
import { GiveRatingPage } from "../pages/home/connexion/main/map/request-modal/response-modal/linking/give-rating/give-rating";
import { HelpPage } from "../pages/home/connexion/main/menu/help/help";
import { LegalNoticePage } from "../pages/home/connexion/main/menu/legal-notice/legal-notice";
import { LinkingPage } from "../pages/home/connexion/main/map/request-modal/response-modal/linking/linking";
import { MainPage } from "../pages/home/connexion/main/main";
import { MapPage } from "../pages/home/connexion/main/map/map";
import { ProfilePage } from "../pages/home/connexion/main/menu/tabs/profile/profile";
import { RatingsPage } from "../pages/home/connexion/main/menu/ratings/ratings";
import { RegisterPage } from "../pages/home/register/register";
import { RequestModalPage } from "../pages/home/connexion/main/map/request-modal/request-modal";
import { ResponseModalPage } from "../pages/home/connexion/main/map/request-modal/response-modal/response-modal";
import { SearchBarPage } from "../pages/home/connexion/main/map/search-bar/search-bar";
import { TabsPage } from "../pages/home/connexion/main/menu/tabs/tabs";
import { VehiclePage } from "../pages/home/connexion/main/menu/tabs/vehicle/vehicle";
import { ChoicePage } from "../pages/home/register/choice/choice";
import { PedestrianPage } from "../pages/home/connexion/main/menu/tabs/pedestrian/pedestrian";
import { DriverInfosPage } from "../pages/home/register/driver-infos/driver-infos";

// ***************************************
//        IMPORTS DES PROVIDERS IONIC
// ***************************************

import { UserProvider } from "../providers/user/userProvider";
import { RouteProvider } from "../providers/route/route";
import { AuthService } from "../providers/auth/auth.service";
import { TokenStorage } from "../providers/auth/token.storage";
import { ImageProvider } from "../providers/Image/imageProvider";
import { DriverProvider } from "../providers/driver/driverProvider";
import { MessageProvider } from "../providers/Messages/MessageProvider";
import { TripProvider } from "../providers/trip/trip";
import { PedestrianProvider } from "../providers/Pedestrian/PedestrianProvider";
import { MatchProvider } from '../providers/match/matchProvider';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ConnexionPage,
    ContactPage,
    PedestrianPage,
    GiveRatingPage,
    HelpPage,
    LegalNoticePage,
    LinkingPage,
    MainPage,
    MapPage,
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
    ConnexionPage,
    ContactPage,
    PedestrianPage,
    GiveRatingPage,
    HelpPage,
    LegalNoticePage,
    LinkingPage,
    MainPage,
    MapPage,
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
    ImageProvider,
    RouteProvider,
    DriverProvider,
    MessageProvider,
    RouteProvider,
    TripProvider,
    PedestrianProvider,
    MatchProvider

  ]
})
export class AppModule {}
