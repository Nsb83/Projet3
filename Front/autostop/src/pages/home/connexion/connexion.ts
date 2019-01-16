import { Component, OnInit } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { MainPage } from "./main/main";
import { LostPasswordPage } from "../lost-password/lost-password";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Credentials } from "../../../models/Credentials";
import { UserProvider } from "../../../providers/user/userProvider";
import { AuthService } from '../../../providers/auth/auth.service';
import { TokenStorage } from '../../../providers/auth/token.storage';
import { HttpResponse } from "@angular/common/http";
import { ChoicePage } from "../register/choice/choice";
import { MessageProvider } from "../../../providers/Messages/MessageProvider";

@Component({
  selector: "page-connexion",
  templateUrl: "connexion.html"
})
export class ConnexionPage implements OnInit {
  main = MainPage;
  lostPasswordPage = LostPasswordPage;


  private connexion: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private userService: UserProvider,
    private authService: AuthService, 
    private token: TokenStorage,
    private messageService: MessageProvider
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.connexion = this.formBuilder.group({
      email: ["", Validators.required],
      password: [""]
    });
  }

  validateForm(connexion) {

    let credentials = new Credentials(
      connexion.email,
      connexion.password
    );

    this.authService.attemptAuth(credentials)
    .subscribe(
      (data: HttpResponse<any>) => {
        this.token.saveToken(data.headers.get('Authorization'));
        this.userService.setUserId(data.headers.get('UserID'));
        this.messageService.myAlertMethod("Bienvenue !", "Vous êtes désormais connecté", false)
        this.navCtrl.push(ChoicePage);
        console.log(data);
      }
    );
    // this.userService.connectUser(credentials).subscribe((data: HttpResponse<any>) => {
    //   console.log("headers: ", data.headers.get('Authorization'));
    //   // response = data;
    //   // console.log("Response: ", response);
    // }, err => {console.log(err);
    // });
  }

  onNavigate2(page) {
    this.navCtrl.push(page);
  }

}
