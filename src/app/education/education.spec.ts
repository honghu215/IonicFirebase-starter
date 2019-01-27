
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-education-details',
    templateUrl: './education-details.page.html',
    styleUrls: ['./education-details.page.scss'],
})
export class EducationDetailsPage implements OnInit {


    constructor() { }

    ngOnInit() {
    }


    // async deleteTodo() {
    //     if (this.todoId) {
    //         const loading = await this.loadingController.create({
    //             message: 'Deleting Todo...'
    //         });
    //         await loading.present();

    //         this.todoService.removeTodo(this.todoId).then(() => {
    //             loading.dismiss();
    //             this.nav.goBack();
    //         });
    //     }
    // }


}
