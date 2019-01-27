import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-record',
  templateUrl: './record.page.html',
  styleUrls: ['./record.page.scss'],
})
export class RecordPage implements OnInit {
  urls = [];
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.loadRecords();
  }

  loadRecords() {
    this.auth.getBucketList();
    // const path = firebase.storage()
    //   console.log(path);
    //   this.urls.push(path);
    // .then( res => {
      //   console.log(res);
      //   this.urls.push(res);
      // })
      // .catch(error => {
      //   console.log(error);
      // });
  }

}
