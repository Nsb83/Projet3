import { Component, OnInit } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { MainPage } from "./main/main";
import { LostPasswordPage } from "../lost-password/lost-password";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Credentials } from "../../../models/Credentials";
import { UserProvider } from "../../../providers/user/userProvider";
import { HttpResponse } from "@angular/common/http";

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
    private userService: UserProvider
  ) {}

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
    let response;
    let credentials = new Credentials(
      connexion.email,
      connexion.password
    );
    this.userService.connectUser(credentials).subscribe((data: HttpResponse<any>) => {
      console.log("headers: ", data.headers.get('Authorization'));
      // response = data;
      // console.log("Response: ", response);
    }, err => {console.log(err);
    });
  }
}
