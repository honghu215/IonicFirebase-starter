import { ChatsService } from './../../services/chats.service';
import { NavController, NavParams } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage {

  messages: Observable<any[]>;
  message = '';
  chatId = null;
  chatTitle = '';
  currentUserId = this.auth.getCurrentUserId();
  @ViewChild(Content) content: Content;


  constructor(private auth: AuthService, private navCtrl: NavController,
    private navParams: NavParams, private chatService: ChatsService) {
    this.chatId = this.navParams.get('chatId');
    this.chatTitle = this.navParams.get('users');
    this.messages = this.chatService.getChatMessages(this.chatId);
  }

  sendMessage() {
    this.chatService.addChatMessage(this.message, this.chatId).then(() => {
      this.message = '';
      // this.content.scrollToBottom = 0;
    });
  }

}
