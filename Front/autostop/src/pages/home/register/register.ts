import { Component, OnInit } from "@angular/core";
import { NavController, NavParams, AlertController } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { User } from "../../../models/User";
import { ChoicePage } from "./choice/choice";
import { UserProvider } from "../../../providers/user/user";

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
    private alertCtrl: AlertController,
    private userService: UserProvider
  ) {}

  ngOnInit() {
    this.initForm();
    this.userService.testServer();
    this.userService.getUser();
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
      console.log(this.newUser);
      this.navCtrl.push(ChoicePage);
    });
    
    

// ************************************
// FOR DEVELOPMENT PURPOSES ONLY
// ************************************
    let alert = this.alertCtrl.create({
      title:
        "Nouveau compte créé pour " +
        this.newUser.getLastName() +
        ", " +
        this.newUser.getFirstName(),
      subTitle:
        "Tel. : " + this.newUser.getPhone() + ", Mail : " + this.newUser.getAccount().email,
      buttons: ["Ok"]
    });
    alert.present();
// ************************************

  }
}
