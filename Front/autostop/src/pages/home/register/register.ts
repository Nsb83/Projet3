import { Component, OnInit } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { User } from "../../../models/User";
import { UserProvider } from "../../../providers/user/userProvider";
import { ConnexionPage } from "../connexion/connexion";
import { HttpErrorResponse } from "@angular/common/http";
import { MessageProvider } from "../../../providers/Messages/MessageProvider";

@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage implements OnInit {

  private newUser: User;
  private register: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private userService: UserProvider,
    private messageService: MessageProvider
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.register = this.formBuilder.group(
      {
        lastName: ["", Validators.required],
        firstName: ["", Validators.required],
        phone: ["", Validators.required],
        email: ["", Validators.compose([Validators.email, Validators.required])],
        sex: ["", Validators.required],
        dateOfBirth: ["", Validators.required],
        password: ["", Validators.required],

        passwordConfirmation: ["", Validators.required]
      },
      { validator: this.passwordControl("password", "passwordConfirmation") }
    );
  }

  passwordControl(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  validateForm(register) {
    this.newUser = new User(
      register.lastName,
      register.firstName,
      register.phone,
      register.sex,
      register.dateOfBirth,
      register.email,
      register.password
    );
    this.userService.createUser(this.newUser).subscribe(() => {
      this.messageService.myToastMethod(`Bienvenue ${this.newUser.getFirstName()} ! Merci pour votre inscription, vous pouvez désormais vous connecter.`)
      this.navCtrl.push(ConnexionPage);
    }, (error: HttpErrorResponse) => {
      this.messageService.myToastMethod(`Une erreur est survenue, veuillez réessayer`);
    }
    );
  }
}
