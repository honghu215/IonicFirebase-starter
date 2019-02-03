import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  chatsRef = this.afdb.list('chats');
  constructor(private http: HttpClient, private afAuth: AngularFireAuth, private afdb: AngularFireDatabase, private auth: AuthService) { }

  getUserChatgroups() {
    return this.afdb.list('groups/' + this.afAuth.auth.currentUser.uid).snapshotChanges()
      .map(actions => {
        return actions.map(action => ({
          id: action.key,
          ...action.payload.val()
        }));
      })
      .map(res => {
        const groups = [];
        for (const obj of res) {
          const chatId = obj['id'];
          const sub = this.afdb.object('chats/' + chatId + '/member').valueChanges();
          groups.push({ id: chatId, sub: sub });
        }
        return groups;
      });
  }

  startChatgroup(id) {
    return this.chatsRef.push({
      member: [this.afAuth.auth.currentUser.uid, id]
    }).then(res => {
      return this.afdb.list('groups/' + this.afAuth.auth.currentUser.uid).set(res.key, true)
        .then(() => {
          return this.afdb.list('groups/' + id).set(res.key, true);
        });
    });
  }

  getChatMessages(chatId) {
    return this.afdb.list('chats/' + chatId + '/messages').valueChanges();
  }

  addChatMessage(msg, chatId) {
    return this.afdb.list('chats/' + chatId + '/messages').push({
      msg: msg,
      from: this.afAuth.auth.currentUser.uid,
      createdAt: firebase.database.ServerValue.TIMESTAMP
    });
  }
}
