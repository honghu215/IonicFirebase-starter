import { AuthService } from './../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { Image } from '../services/image.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-record',
  templateUrl: './record.page.html',
  styleUrls: ['./record.page.scss'],
})
export class RecordPage implements OnInit, OnDestroy {
  images: Image[];
  imageSubscription: Subscription;
  isLoggedin: boolean;

  constructor(private auth: AuthService) {
    this.auth.authChange.subscribe(status => {
      this.isLoggedin = status;
      if (!status) {
        this.images = null;
      }
    });
  }

  ngOnInit() {
    this.imageSubscription = this.auth.getImages().subscribe( data => {
      this.images = data;
      this.images.sort(this.compare);
    });
  }

  compare(img1: Image, img2: Image) {
    if (img1.createdAt < img2.createdAt) {
      return 1;
    } else if (img1.createdAt > img2.createdAt) {
      return -1;
    } else {
      return 0;
    }
  }

  ngOnDestroy() {
    this.imageSubscription.unsubscribe();
  }

}
