import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';

@IonicPage()
@Component({
  selector: 'page-communication',
  templateUrl: 'communication.html',
})
export class CommunicationPage {

  constructor(
    public navCtrl: NavController,
    private callNumber: CallNumber,
    private sms: SMS,
    private alertCtrl: AlertController,
    public navParams: NavParams) {
  }


  makeCall() {
    let alert = this.alertCtrl.create({
      title: 'No Telepon',
      inputs: [
        { name: 'phone_no', placeholder: 'No Telepon' }
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Call',
          cssClass: "alertDanger",
          handler: data => {
            if (data.phone_no.length > 0) {
              this.callNumber.callNumber(data.phone_no, false)
                .then(() => console.log('Launched dialer!'))
                .catch(() => console.log('Error launching dialer'));
            }
          }
        }
      ]
    });
    alert.present();
  }

  makeSms() {
    let alert = this.alertCtrl.create({
      title: 'No Telepon',
      inputs: [
        { name: 'phone_no', placeholder: 'No Telepon' },
        { name: 'message', placeholder: 'Kirim' }
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Sent',
          cssClass: "alertDanger",
          handler: data => {
            if (data.phone_no.length > 0 && data.message.length > 0) {
              this.sms.send(data.phone_no, data.message);
            }
          }
        }
      ]
    });
    alert.present();
  }

}
