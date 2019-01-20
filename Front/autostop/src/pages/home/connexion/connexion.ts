import { Component, OnInit } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { MainPage } from "./main/main";
import { LostPasswordPage } from "../lost-password/lost-password";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Credentials } from "../../../models/Credentials";
import { UserProvider } from "../../../providers/user/userProvider";
import { AuthService } from '../../../providers/auth/auth.service';
import { TokenStorage } from '../../../providers/auth/token.storage';
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { ChoicePage } from "../register/choice/choice";
import { MessageProvider } from "../../../providers/Messages/MessageProvider";
import { User } from "../../../models/User";

@Component({
  selector: "page-connexion",
  templateUrl: "connexion.html"
})
export class ConnexionPage implements OnInit {
  main = MainPage;
  lostPasswordPage = LostPasswordPage;


  private connexion: FormGroup;
  private user: User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private authService: AuthService, 
    private token: TokenStorage,
    private messageService: MessageProvider,
    private userProvider: UserProvider
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
        this.userProvider.setUserId(data.headers.get('UserID'));
        this.userProvider.getUser().subscribe(response => { this.user = response});
        this.navCtrl.push(ChoicePage);
      }, (error: HttpErrorResponse) => {
        console.log('Error: ', error);
        this.messageService.myToastMethod(`Une erreur est survenue, veuillez vérifier vos identifiants de connexion.`);
      }
    );
  }

  onNavigate2(page) {
    this.navCtrl.push(page);
  }

}
