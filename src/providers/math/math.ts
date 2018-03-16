import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MathProvider {
  constructor() {
  }

  // #region Promise
  checkPromise(val_a, val_b) : Promise<any> {
    let p = new Promise((resolve, reject) => {
      if (val_a == val_b) {
        resolve('Both value are equal.');
      } else {
        reject('Opps, both value are not equal.');
      }
    });

    return p;
  }

  checkPromiseRace() {
    var promise1 = new Promise( (resolve, reject) => {
      console.log('Hello from promise 1');
      reject('Hello from promise 1');
    });

    var promise2 = new Promise( (resolve, reject) => {
      console.log('Hello from promise 2');
      resolve('Hello from promise 2');
    });

    Promise.race([promise1, promise2]).then((value) => {
      console.log(value);
      alert(value);
    }).catch((err) => {
      console.log(err);
      alert(err);
    });
  }
  // #endregion

  // #region Subscribe
  observerId : any;
  observerObj : any;
  TimerCount : any = 0;
  TimerIsRunning = false;

  getTick() : Observable<any> {
    this.observerId = Observable.create( (observer) => {
      this.observerObj = observer;
      this.startTimer();
    });

    return this.observerId;
  }

  updateTick() {
    setTimeout(() => {
      if (this.TimerIsRunning) {
        this.observerObj.next('Hello ' + this.TimerCount);
        this.TimerCount++;
        this.updateTick();
      }
    }, 500);
  }

  startTimer() {
    this.TimerCount = 0;
    this.TimerIsRunning = true;
    this.updateTick();
  }

  stopTimer() {
    delete this.observerObj;
    this.TimerIsRunning = false;
  }
  //#endregion
}
