import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';

import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private fireAuth: AngularFireAuth) {
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

  async Login() {
    try {
      const result = await this.fireAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
      console.log(result);
      if (result.uid) {
        this.navCtrl.push(HomePage);
      }
    }
    catch(e) {
      console.error(e);
    }
  }

  Register() {
    this.navCtrl.push(RegisterPage);
  }
}
