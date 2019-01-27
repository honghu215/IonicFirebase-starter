import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-education',
  templateUrl: './education.page.html',
  styleUrls: ['./education.page.scss'],
})
export class EducationPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  pageOne() {
    this.router.navigate(['/education/one']);
  }
  pageTwo() {
    this.router.navigate(['/education/two']);
  }

}
