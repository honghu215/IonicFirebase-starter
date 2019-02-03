import { Camera } from '@ionic-native/camera';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PhotographPage } from './photograph.page';
import { QRCodeModule } from 'angularx-qrcode';

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
    QRCodeModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    PhotographPage
  ],
  declarations: [PhotographPage]
})
export class PhotographPageModule {}
