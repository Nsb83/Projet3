import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { User } from '../../../../../../models/User';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  @ViewChild('message') message;

  constructor(public navCtrl: NavController, public navParams: NavParams, private emailComposer: EmailComposer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

// ****************************************************************
//        METHOD TO BE COMPLETED WITH USER'S EMAIL ADRESS
//          & TESTED ON DEVICE WITH MAIL APP INSTALLED
// ****************************************************************
  onSubmit(){
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        //Now we know we can send
      }
     });
     
     let email = {
       to: 'wildautostop@gmail.com',
       cc: '',
       bcc: ['', ''],
       attachments: [
       ],
       subject: 'Message from autostop user ', // TO BE COMPLETED WITH USER'S NAME
       body: this.message.value,
       isHtml: true
     };
     
     // Send a text message using default options
     this.emailComposer.open(email);
     console.log(email);
  }
// ****************************************************************

}
