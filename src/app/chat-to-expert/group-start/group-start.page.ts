import { AuthService } from './../../services/auth.service';
import { NavController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ViewController } from '@ionic/core';

@Component({
  selector: 'app-group-start',
  templateUrl: './group-start.page.html',
  styleUrls: ['./group-start.page.scss'],
})
export class GroupStartPage {
  users: Observable<any[]>;
  search = '';
  filteredUsers: Observable<any[]>;
  constructor(private navCtrl: NavController, private viewCtrl: ViewController,
              private auth: AuthService, private modalCtrl: ModalController) { }

  ionViewDidLoad() {
    this.users = this.auth.getAllUsers();
    this.filterItems();
  }

  filterItems() {
    this.filteredUsers = this.users.map(array => {
      return array.filter(user => {
        return user['username'].toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    });
  }

  startChat(userId) {
    this.modalCtrl.dismiss({
      startChatWith: userId
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
