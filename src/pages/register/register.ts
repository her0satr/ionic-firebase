import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fireAuth: AngularFireAuth) {
  }

  async Register() {
    try {
      const result = await this.fireAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password);
      this.navCtrl.push(LoginPage);
    }
    catch(e) {
      console.error(e);
    }
  }

}
