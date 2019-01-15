import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class MessageProvider {

    constructor(public alertCtrl: AlertController) {}

    myAlertMethod(title: string, message: string, handler: any) {
      let confirm = this.alertCtrl.create({
        title: title,
        message: message,
        enableBackdropDismiss: false,
        buttons: [
          {
            text: "OK",
            handler: handler
          }
        ]
      });
      confirm.present();
    }
}