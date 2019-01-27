import { EducationRoutingModule } from './education-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EducationPage } from './education.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EducationRoutingModule
  ],
  declarations: [EducationPage]
})
export class EducationPageModule {}
