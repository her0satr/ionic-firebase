import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MathProvider } from '../../providers/math/math';

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
  promise_a: any;
  promise_b: any;
  promise_result: any;

  timerId: any;
  timerValue: any;

  constructor(
    public navCtrl: NavController,
    private math: MathProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventPage');
  }

  checkPromise() {
    this.math.checkPromise(this.promise_a, this.promise_b).then( (data) => {
      this.promise_result = data;
    }).catch( (err) => {
      this.promise_result = err;
    });
  }

  checkPromiseRace() {
    this.math.checkPromiseRace();
  }

  timeStart() {
    this.timerId = this.math.getTick().subscribe((data) => {
      this.timerValue = data;
    });
  }

  timeStop() {
    this.timerId.unsubscribe();
    this.math.stopTimer();
  }
}
