import { Component, OnInit } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { MainPage } from "./main/main";
import { LostPasswordPage } from "../lost-password/lost-password";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from '../../../providers/auth/auth.service';
import { TokenStorage } from '../../../providers/auth/token.storage';
import { HttpResponse } from "@angular/common/http";


@Component({
  selector: "page-connexion",
  templateUrl: "connexion.html"
})
export class ConnexionPage 
// implements OnInit 
{
  main = MainPage;
  lostPasswordPage = LostPasswordPage;

  private connexion: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private authService: AuthService, 
    private token: TokenStorage
  ) {}

  email: string;
  password: string;

  login() {
    this.authService.attemptAuth(this.email, this.password)
    .subscribe(
      (data: HttpResponse<any>) => {
        console.log(data);
        this.token.saveToken(data.headers.get('Authorization'));
        this.navCtrl.push(MainPage);
      }
    );
  }

  // ngOnInit() {
  //   // this.initForm();
  // }

  // initForm() {
  //   this.connexion = this.formBuilder.group({
  //     email: ["", Validators.required],
  //     password: [""]
  //   });
  // }

  // onNavigate2(page) {
  //   this.navCtrl.push(page);
  // }
}
