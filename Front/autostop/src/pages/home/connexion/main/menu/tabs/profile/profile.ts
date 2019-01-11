import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../../../../../../providers/user/userProvider';
import { User } from '../../../../../../../models/User';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { MainPage } from '../../../main';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit {
  user: User;
  userUpdate: User;
  private updateProfil: FormGroup;
  myDate:string;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder, 
    private userService : UserProvider
    ) {
  }


  ngOnInit() {
  
    this.user = this.userService.getUser();
    this.myDate = this.user.getDateOfBirth()
    console.log(this.user);
    this.initForm();
  }

  initForm() {
    this.updateProfil = this.formBuilder.group(
      {
        lastName: ["", Validators.required],
        firstName: ["", Validators.required],
        phone: ["", Validators.required],
        email: ["", Validators.compose([Validators.email, Validators.required])],
        sex: ["", Validators.required],
        dateOfBirth: [""],
      },
    );
  }

  validateForm(updateProfil){
    this.userUpdate = new User(
      updateProfil.lastName,
      updateProfil.firstName,
      updateProfil.phone,
      updateProfil.sex,
      updateProfil.dateOfBirth,
      updateProfil.email,
      // updateProfil.password
    );

    this.userService.updateUser(this.userUpdate).subscribe(() => {
      console.log(this.userUpdate);
      this.userService.getUser();
    });
    

  }

}
