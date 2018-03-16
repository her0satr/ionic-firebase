import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CameraPage } from '../camera/camera';
import { CommunicationPage } from '../communication/communication';
import { GoogleMapPage } from '../google-map/google-map';
import { CrudFirebasePage } from '../crud-firebase/crud-firebase';
import { EventPage } from '../event/event';

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
    for (let i = 1; i < 2; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }

    // additional page
    this.items.push({ title: 'CRUD Firebase', note: '', icon: 'add', type: 'page', page_path: CrudFirebasePage });
    this.items.push({ title: 'Event', note: '', icon: 'trending-up', type: 'page', page_path: EventPage });
    this.items.push({ title: 'Camera', note: '', icon: 'camera', type: 'page', page_path: CameraPage });
    this.items.push({ title: 'Communication', note: '', icon: 'megaphone', type: 'page', page_path: CommunicationPage });
    this.items.push({ title: 'Google Map', note: '', icon: 'map', type: 'page', page_path: GoogleMapPage });
  }

  itemTapped(event, item) {
    if (item.type == 'page') {
      this.navCtrl.push(item.page_path);
    } else {
      this.navCtrl.push(ListPage, { item: item });
    }
  }
}