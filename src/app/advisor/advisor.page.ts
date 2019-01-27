import { client } from './dialog-flow-client/dialog-flow.client';
import { Imessage } from './../services/message';
import { Component } from '@angular/core';

@Component({
  selector: 'app-advisor',
  templateUrl: './advisor.page.html',
  styleUrls: ['./advisor.page.scss'],
})
export class AdvisorPage {

  conversation: Imessage[] = [];

  addMessageFromUser(message) {
    this.conversation.push({
      avatar: 'person',
      from: 'Me',
      content: message.value
    });

    client.textRequest(message.value).then((response) => {
      this.conversation.push({
        avatar: 'android',
        from: 'Bot',
        content: response.result.fulfillment['speech'] || 'I can\'t seem to figure that out!'
      });
      message.value = '';
    });
  }



}
