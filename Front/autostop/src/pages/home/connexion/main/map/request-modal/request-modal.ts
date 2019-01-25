import { ResponseModalPage } from './response-modal/response-modal';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { PedestrianProvider } from '../../../../../../providers/Pedestrian/PedestrianProvider';
import { MatchingEntity } from '../../../../../../models/MatchingEntity';
import { UserProvider } from '../../../../../../providers/user/userProvider';
import { MatchingUserDetails } from '../../../../../../models/MatchingUserDetails';
import { LinkingPage } from './response-modal/linking/linking';

@Component({
  selector: 'page-request-modal',
  templateUrl: 'request-modal.html',
})
export class RequestModalPage {
  matchableUser: MatchingUserDetails;

  // test variables
  testRating: number = 4;

  matchingEntityId: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private pedestrianProvider: PedestrianProvider,
              private userProvider: UserProvider,
              private events: Events) {

    this.matchableUser = this.navParams.get('matchUser');
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  sendRequest(){
    let matchingEntity = new MatchingEntity(this.matchableUser.publicId, this.userProvider.getUserId())
    this.pedestrianProvider.sendRequest(matchingEntity).subscribe((data: any) => {
      console.log(data);
      this.matchingEntityId = data.id;
      this.viewCtrl.dismiss();
      this.navCtrl.push(ResponseModalPage, { 
                                            matchableUser : this.matchableUser,
                                            matchingEntityId : this.matchingEntityId
                                          });
    });
  }

  ionViewDidLoad() {
    console.log(this.matchableUser);
  }

//Couleur d'étoiles dynamiques
  getStar(num){
    if (num< this.testRating){
      return "./assets/imgs/stars/starFullSm.png";
    }
    else return "./assets/imgs/stars/starEmptySm.png";
  }

}
