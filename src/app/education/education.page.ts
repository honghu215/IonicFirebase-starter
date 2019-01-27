import { Component} from '@angular/core';

@Component({
    selector: 'app-education',
    templateUrl: 'education.page.html',
    styleUrls: ['education.page.scss']
})
export class EducationPage {
    navCtrl: any;
toOne() {
    this.navCtrl.push('One');
}
}
