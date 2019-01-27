import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-one',
  templateUrl: './one.page.html',
  styleUrls: ['./one.page.scss'],
})
export class One {
  name: String;
  age: number;
  constructor(public navCtrl: NavController, public navParam: NavParams) {
    this.name = this.navParam.get('name');
    this.age = this.navParam.get('age');
  }
  // back() {
  //   this.navCtrl.pop();
}

