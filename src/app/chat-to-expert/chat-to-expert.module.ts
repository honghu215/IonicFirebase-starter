import { GroupsPage } from './groups/groups.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChatToExpertPage } from './chat-to-expert.page';

const routes: Routes = [
  {
    path: '',
    component: GroupsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChatToExpertPage]
})
export class ChatToExpertPageModule {}
