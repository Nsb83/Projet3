import { LinkingPage } from './linking/linking';
import { MapPage } from './../../map';
import { Component,NgModule } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer) {
    this.matchableUser = this.navParams.get('matchableUser');
  }

  matchableUser;

  // test variables
  testTrip: string = "Chemin de la Plaine, Thurins";
  testRating: number = 4;

  //Couleur d'étoiles dynamiques
  getStar(num){
    if (num< this.testRating){
      return "./assets/imgs/stars/starFullSm.png";
    }
    else return "./assets/imgs/stars/starEmptySm.png";
  }

  goToLinking(){
    this.navCtrl.push(LinkingPage, { matchableUser : this.matchableUser});
  }

  cancelRequest(){
    this.navCtrl.popAll();
  }

  ionViewDidLoad() {
    this.startTimer();
  }


  // timer code
  
  ngOnInit() {
    this.initTimer();
    
  }

  hasFinished() {
    // place here  function to launch when timer finished
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
  // timer code end
}
