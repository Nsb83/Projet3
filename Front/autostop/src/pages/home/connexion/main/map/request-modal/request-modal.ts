import { ResponseModalPage } from './response-modal/response-modal';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { MatchingEntity } from '../../../../../../models/MatchingEntity';
import { UserProvider } from '../../../../../../providers/user/userProvider';
import { MatchingUserDetails } from '../../../../../../models/MatchingUserDetails';
import { MatchProvider } from '../../../../../../providers/match/matchProvider';

@Component({
  selector: 'page-request-modal',
  templateUrl: 'request-modal.html',
})
export class RequestModalPage {
  matchableUser: MatchingUserDetails;
  matchingEntityId: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private userProvider: UserProvider,
              private matchProvider: MatchProvider,
              private events: Events) {

    this.matchableUser = this.navParams.get('matchUser');
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  sendRequest(){
    let matchingEntity = new MatchingEntity(this.matchableUser.publicId, this.userProvider.getUserId())
    this.matchProvider.sendRequest(matchingEntity).subscribe((data: any) => {
      this.viewCtrl.dismiss();
      this.navCtrl.push(ResponseModalPage, {
                                            matchableUser : this.matchableUser,
                                            matchingEntity : data
                                          });
    });
  }

// //Couleur d'étoiles dynamiques
//   getStar(num){
//     if (num< this.testRating){
//       return "./assets/imgs/stars/starFullSm.png";
//     }
//     else return "./assets/imgs/stars/starEmptySm.png";
//   }

}
