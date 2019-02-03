import { GroupStartPage } from './../group-start/group-start.page';
import { Router } from '@angular/router';
import { ChatsService } from './../../services/chats.service';
import { AuthService } from './../../services/auth.service';
import { NavController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss']
})
export class GroupsPage {
  chats = [];
  groupsSubscription: Subscription[] = [];
  constructor(private navCtrl: NavController,
    private modalCtrl: ModalController,
    private auth: AuthService,
    private chatService: ChatsService,
    private router: Router) { }


  ionViewWillEnter() {
    this.loadGroups();
  }

  loadGroups() {
    const sub = this.chatService.getUserChatgroups().subscribe(groupObservables => {
      this.chats = [];

      for (const group of groupObservables) {
        const sub1 = group['sub'].subscribe(groupData => {
          const chat = { id: group.id, member: [] };
          for (const memberId of groupData) {
            const nicknameSub = this.auth.getUsername(memberId).subscribe(nickname => {
              chat.member.push({ id: memberId, nickname: nickname });
            });
            this.groupsSubscription.push(nicknameSub);
          }
          this.chats.push(chat);
        });
        this.groupsSubscription.push(sub1);
      }
    });
    this.groupsSubscription.push(sub);
  }

  async startGroup() {
    const modal = await this.modalCtrl.create({component: 'GroupStartPage'});
    modal.dismiss(data => {
      if (data && data.startChatWith) {
        this.joinOrCreateGroup(data.startChatWith);
      }
    });
    modal.present();
  }

  joinOrCreateGroup(withUserId) {
    let found = null;

    for (const groupData of this.chats) {
      for (const member of groupData.member) {
        if (member.id === withUserId) {
          found = groupData.id;
          break;
        }
      }
    }

    if (found) {
      this.openChatRoom(found);
    } else {
      this.chatService.startChatgroup(withUserId);
    }
  }

  openChatRoom(id) {
    for (const groupData of this.chats) {
      if (groupData.id === id) {
        const users = groupData.member.reduce((a, b) => a.nickname + ', ' + b.nickname);
        // this.navCtrl.push('ChatRoomPage', { chatId: id, users: users });
        this.router.navigate(['chat/room', {chatId: id, users: users}]);
      }
    }
  }

  ionViewWillUnload() {
    for (const oneSub of this.groupsSubscription) {
      oneSub.unsubscribe();
    }
  }
}
