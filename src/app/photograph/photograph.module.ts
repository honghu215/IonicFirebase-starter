import { ItemModalPage } from './item-modal/item-modal.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    PhotographPage
  ],
  declarations: [PhotographPage, ItemModalPage],
  entryComponents: [ItemModalPage]
})
export class PhotographPageModule {}
