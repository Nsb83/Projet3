import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private emailComposer: EmailComposer) {
  }

// ****************************************************************
//        METHOD TO BE COMPLETED WITH USER'S EMAIL ADRESS
//          & TESTED ON DEVICE WITH MAIL APP INSTALLED
// ****************************************************************
  onSubmit(){
     let email = {
       to: 'wildautostop@gmail.com',
       cc: '',
       bcc: ['', ''],
       attachments: [
       ],
       subject: 'Message from autostop user ', // TO BE COMPLETED WITH USER'S NAME
       body: "Bonjour l'équipe autostop, voici ma question : ",
       isHtml: true
     };

     // Send a text message using default options
     this.emailComposer.open(email);
     console.log(email);
  }
// ****************************************************************

}
