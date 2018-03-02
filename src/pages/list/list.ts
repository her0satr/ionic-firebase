import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CameraPage } from '../camera/camera';
import { CommunicationPage } from '../communication/communication';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[];
  items: Array<{}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // set item and icon
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane', 'american-football', 'boat', 'bluetooth', 'build'];
    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }

    // additional page
    this.items.push({ title: 'Camera', note: '', icon: 'camera', type: 'page', page_path: CameraPage });
    this.items.push({ title: 'Communication', note: '', icon: 'megaphone', type: 'page', page_path: CommunicationPage });
  }

  itemTapped(event, item) {
    if (item.type == 'page') {
      this.navCtrl.push(item.page_path);
    } else {
      this.navCtrl.push(ListPage, { item: item });
    }
  }
}