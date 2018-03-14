import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-crud-firebase',
  templateUrl: 'crud-firebase.html',
})
export class CrudFirebasePage {
  myInput : string;
  arrData = [];

  constructor(
    public navCtrl: NavController,
    private fdb: AngularFireDatabase,
    public navParams: NavParams) {
      this.fdb.object('/myItems/').valueChanges().subscribe( (data) => {
        this.arrData = [];
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            this.arrData.push({ id: key, value: data[key] });
          }
        }
      });
  }

  add() {
    this.fdb.list('/myItems/').push(this.myInput);
    this.myInput = '';
  }

  delete(id) {
    this.fdb.list('/myItems/').remove(id);
  }
}
