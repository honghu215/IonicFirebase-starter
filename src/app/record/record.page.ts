import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-record',
  templateUrl: './record.page.html',
  styleUrls: ['./record.page.scss'],
})
export class RecordPage implements OnInit {
  // tslint:disable-next-line:max-line-length
  urls: string;
  constructor(private auth: AuthService) {
    // tslint:disable-next-line:max-line-length
    this.urls = '';
    this.auth.latestUrl.subscribe( curUrl => {
      this.urls = '' + curUrl;
      console.log(this.urls);
    });
  }

  ngOnInit() {
    this.auth.getImages().pipe(
      map(actions => {
        return actions.map( a => {
          this.urls += a.url + ';';
        });
      })
    );
    console.log(this.urls);
  }

}
