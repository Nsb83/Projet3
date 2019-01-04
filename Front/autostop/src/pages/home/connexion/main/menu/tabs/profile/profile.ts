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
   
    console.log('ionViewDidLoad ProfilePage');
    this.user1 = this.userService.getUser();
    this.myDate = this.user1.getDateOfBirth()
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

  validateForm(updateProfil){
    this.userUpdate = new User(
      updateProfil.lastName,
      updateProfil.firstName,
      updateProfil.phone,
      updateProfil.sex,
      updateProfil.dateOfBirth,
      updateProfil.email,
      updateProfil.password
    );

    this.userService.updateUser(this.userUpdate).subscribe(() => {
      console.log(this.userUpdate);
    });
    
  }

}
