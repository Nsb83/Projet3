import { Injectable } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';

@Injectable()
export class MessageProvider {

    constructor(
                public alertCtrl: AlertController,
                public toastCtrl: ToastController
              ) {}

    /**
     * Service to display an alert
     * @param title
     * @param message
     * @param handler
     */
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

    /**
     * Service to display a toast
     * @param message
     * @param duration
     * @param position
     */
    myToastMethod(message: string, duration = 3000, position?: string) {
      let toast = this.toastCtrl.create({
        message: message,
        position: position,
        duration: duration
      });

      toast.present();
    }
}
