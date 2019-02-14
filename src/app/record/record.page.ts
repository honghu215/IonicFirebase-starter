import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
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

  userId: string;
  dbItems: AngularFireList<any>;
  visionItems = [];

  constructor(private auth: AuthService, private db: AngularFireDatabase) {
    this.auth.authChange.subscribe(status => {
      this.isLoggedin = status;
      if (!status) {
        this.images = null;
      }
    });
    this.userId = this.auth.getUserId();
    this.dbItems = this.db.list(this.userId.split('@')[0]);
    this.dbItems.valueChanges().subscribe( items => {
      this.visionItems = items;
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
