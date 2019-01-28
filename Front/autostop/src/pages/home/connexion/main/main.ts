import { Component } from "@angular/core";
import { NavController, Platform, Events } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { TabsPage } from "./menu/tabs/tabs";
import { RatingsPage } from "./menu/ratings/ratings";
import { LegalNoticePage } from "./menu/legal-notice/legal-notice";
import { HelpPage } from "./menu/help/help";
import { ContactPage } from "./menu/contact/contact";
import { User } from "../../../../models/User";
import { UserProvider } from "../../../../providers/user/userProvider";
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
  updatedUser: User;
  main = MainPage;
  token;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public navCtrl: NavController,
    private userService: UserProvider,
    private messageService: MessageProvider,
    public events: Events
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

  chooseMode() {

    if(this.user.isVehiculed()){
      this.updatedUser = new User (
        this.user.getLastName(),
        this.user.getFirstName(),
        this.user.getPhone(),
        this.user.getSex(),
        this.user.getDateOfBirth(),
        this.user.getEmail(),
        this.user.getPassword(),
        false,
        this.user.getPublicId()
      );
    }

    else{
      this.updatedUser = new User (
        this.user.getLastName(),
        this.user.getFirstName(),
        this.user.getPhone(),
        this.user.getSex(),
        this.user.getDateOfBirth(),
        this.user.getEmail(),
        this.user.getPassword(),
        true,
        this.user.getPublicId()
      )
    }

    this.userService.updateUser(this.updatedUser).subscribe(() => {
      this.events.publish('user:changed', '');
      this.userService.getUser().subscribe(response => {
        this.user = response;
        if(this.updatedUser.isVehiculed()){
          this.messageService.myToastMethod("Vous êtes désormais connecté en tant que conducteur.")
        }
        else{
          this.messageService.myToastMethod("Vous êtes désormais connecté en tant que piéton.")
        }
      });
    });
  }

  menuClosed() {
    this.events.publish('menu:closed', '');
  }

  SignOut() {
    this.events.publish('user:logout');
    this.token.signOut();
    this.messageService.myToastMethod("Au revoir ! Vous êtes désormais déconnecté")
    this.navCtrl.setRoot(HomePage);
    }
}
