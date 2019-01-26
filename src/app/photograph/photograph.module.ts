import { Camera } from '@ionic-native/camera';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PhotographPage } from './photograph.page';

const routes: Routes = [
  {
    path: '',
    component: PhotographPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PhotographPage]
})
export class PhotographPageModule {}
