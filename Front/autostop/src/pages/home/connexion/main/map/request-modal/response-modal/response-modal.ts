import { LinkingPage } from './linking/linking';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { MatchingUserDetails } from '../../../../../../../models/MatchingUserDetails';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { PedestrianProvider } from '../../../../../../../providers/Pedestrian/PedestrianProvider';
import { MatchProvider } from '../../../../../../../providers/match/matchProvider';


export interface CountdownTimer {
  seconds: number;
  secondsRemaining: number;
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  displayTime: string;
}


@Component({
  selector: 'page-response-modal',
  templateUrl: 'response-modal.html',
})
export class ResponseModalPage {
  timeInSeconds: number = 90;
  timer: CountdownTimer;
  private increment;
  private transform;
  private percent;
  private fixTransform;
  matchableUser: MatchingUserDetails;
  pollingMatchingEntity: any;
  matchingEntityChanged: boolean = false;
  matchingEntity: any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private sanitizer: DomSanitizer,
              public viewCtrl: ViewController,
              private events: Events,
              private matchProvider: MatchProvider) {
              this.matchableUser = this.navParams.get('matchableUser');
              this.matchingEntity = this.navParams.get('matchingEntity');
  }

  ionViewDidLoad() {
    this.startTimer();
  }


  ngOnInit() {
    this.initTimer();
    if (this.matchableUser.vehiculed) {
      this.pollingMatchingEntity = Observable.interval(1000)
          .pipe(takeWhile(() => !this.matchingEntityChanged))
          .switchMap(() => this.matchProvider.checkMatchingEntity(this.matchingEntity.id))
          .subscribe(
            (data: boolean)=> {
              this.matchingEntityChanged = data;
              if (data) {
                this.navCtrl.push(LinkingPage, { matchableUser : this.matchableUser})
              }
            },
            error => {
            });
    }
  }


  declineRequest() {
    this.events.publish('request:declined');
    this.navCtrl.pop();
  }

  acceptRequest() {
    console.log("Matching entity non typée : ", this.matchingEntity);
    
    let newMatchingEntity = this.matchingEntity;
    newMatchingEntity.accepted = true;
    this.matchProvider.updateMatchingEntity(newMatchingEntity).subscribe((res) => {
      console.log("Réponse de la requête http.put : ", res);
    });
    this.navCtrl.pop();
    this.navCtrl.push(LinkingPage, { matchableUser : this.matchableUser});
  }


  hasFinished() {
    return this.timer.hasFinished;
  }
  initProgressBar() {
    this.percent = 100;
    this.increment = 180 / 100;
    const progress = 'rotate(' + this.increment * this.percent + 'deg)';
    this.transform = this.sanitizer.bypassSecurityTrustStyle(progress);
    this.fixTransform = this.sanitizer.bypassSecurityTrustStyle(progress);
  }

  initTimer() {
    this.initProgressBar();
    if (!this.timeInSeconds) { this.timeInSeconds = 0; }

    this.timer = <CountdownTimer>{
      seconds: this.timeInSeconds,
      runTimer: false,
      hasStarted: false,
      hasFinished: false,
      secondsRemaining: this.timeInSeconds
    };

    this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
  }

  startTimer() {
    this.timer.hasStarted = true;
    this.timer.runTimer = true;
    this.timerTick();
  }


  timerTick() {
    setTimeout(() => {
      if (!this.timer.runTimer) { return; }
      this.timer.secondsRemaining--;
      this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
      this.percent = this.timer.secondsRemaining / this.timer.seconds * 100;
      this.increment = 180 / 100;
      const progress = 'rotate(' + this.increment * this.percent + 'deg)';
      this.transform = this.sanitizer.bypassSecurityTrustStyle(progress);
      this.fixTransform = this.sanitizer.bypassSecurityTrustStyle(progress);
      if (this.timer.secondsRemaining > 0) {
        this.timerTick();
      } else {
        this.timer.hasFinished = true;
        this.navCtrl.pop();
      }
    }, 1000);
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    const secNum = parseInt(inputSeconds.toString(), 10);
    const minutes = Math.floor(secNum / 60);
    const seconds = secNum - (minutes * 60);
    let minutesString = '';
    let secondsString = '';
    minutesString = (minutes < 10) ? '0' + minutes : minutes.toString();
    secondsString = (seconds < 10) ? '0' + seconds : seconds.toString();
    return minutesString + ':' + secondsString;
  }

    // //Couleur d'étoiles dynamiques
  // getStar(num){
  //   if (num< this.testRating){
  //     return "./assets/imgs/stars/starFullSm.png";
  //   }
  //   else return "./assets/imgs/stars/starEmptySm.png";
  // }

}
