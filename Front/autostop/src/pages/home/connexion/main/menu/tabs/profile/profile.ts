import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../../../../../../providers/user/userProvider';
import { User } from '../../../../../../../models/User';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit {
  user1: User;
  private updateProfil: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder, 
    private userService : UserProvider
    ) {
  }


  ngOnInit() {
   
    console.log('ionViewDidLoad ProfilePage');
    this.user1 = this.userService.getUser();
    console.log(this.user1);
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
        dateOfBirth: ["", Validators.required],
        password: ["", Validators.required],
      },
    );
  }

}
