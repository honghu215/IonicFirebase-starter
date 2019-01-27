import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-education',
    templateUrl: 'education.page.html',
    styleUrls: ['education.page.scss']
})
export class EducationPage implements OnInit {
    private selectedItem: any;
    private icons = [
        'information',
        'information',
        'information',
        'information',
        'information',
        'information',
        'information',
        'information',
        'information',
        'information'
    ];
    public items: Array<{ title: string; note: string; icon: string }> = [];
    constructor() {
        for (let i = 1; i < 11; i++) {
            this.items.push({
                title: 'week ' + i,
                note: 'Manual ' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }

    ngOnInit() {
    }
    // add back when alpha.4 is out
    // navigate(item) {
    //   this.router.navigate(['/list', JSON.stringify(item)]);
    // }
}
