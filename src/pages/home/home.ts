import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { User } from '../../models/user';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  user = {} as User;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage) {
    
    // check if user exists
    this.storage.get('user_login').then((val) => {
      if (val != null) {
        this.user = JSON.parse(val);
      }
    });
  }
}
