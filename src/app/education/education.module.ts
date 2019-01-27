import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { EducationPage } from './education.page';
import { EducationRoutingModule } from './education-routing.module';
import { OnePageModule } from './one/one.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EducationRoutingModule
        // RouterModule.forChild([
        //     {
        //         path: '',
        //         component: EducationPage
        //     }
        // ])
    ],
    declarations: [EducationPage]
})
export class EducationPageModule { }
