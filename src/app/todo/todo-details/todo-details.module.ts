import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TodoDetailsPage } from './todo-details.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        RouterModule.forChild([
            { path: '', component: TodoDetailsPage }
        ])
    ],
    declarations: [TodoDetailsPage]
})
export class TodoDetailsPageModule {}
