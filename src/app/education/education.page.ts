import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-education',
    templateUrl: 'education.page.html',
    styleUrls: ['education.page.scss']
})
export class EducationPage implements OnInit {
    constructor(private router: Router) {}

    ngOnInit() {

    }

    go() {
        this.router.navigate(['/education/one']);
    }
}
