import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../../../../../../providers/user/user';
import { User } from '../../../../../../../models/User';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user1: User;
  constructor(public navCtrl: NavController, public navParams: NavParams, private userService : UserProvider) {
  }


  ngOnInit() {
    console.log('ionViewDidLoad ProfilePage');
    this.user1 = this.userService.getUser();
  }

}
