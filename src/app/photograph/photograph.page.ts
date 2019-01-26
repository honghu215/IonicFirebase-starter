import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Image, ImageService } from './../services/image.service';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';


@Component({
  selector: 'app-photograph',
  templateUrl: './photograph.page.html',
  styleUrls: ['./photograph.page.scss'],
})
export class PhotographPage implements OnInit {
  gotUrl = new Subject<Boolean>();
  imageRecords: Image[];
  errorMsg = '';
  captureDataUrl: string;
  imageUrls: string[];

  constructor() { }

  ngOnInit() {
    this.gotUrl.next(false);
  }

  capture() {

    const cameraOptions: CameraOptions = {
      quality: 80,
      destinationType: Camera.DestinationType.DATA_URL,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      // sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
      saveToPhotoAlbum: true
    };


    // Camera.getPicture(cameraOptions).then( imagePath => {
    //   this.captureDataUrl = imagePath;
    //   this.gotUrl.next(true);
    //   this.imageUrls.push(imagePath);
    // }, error => {
    //   console.log(error);
    //   this.errorMsg = error;
    // });
    Camera.getPicture(cameraOptions).then( (imagePath) => {
      console.log(imagePath);
      // this.captureDataUrl = 'data:image/jpeg;base64,' + imagePath;
      this.captureDataUrl = 'data:image/jpeg;base64,' + imagePath;
      console.log(this.captureDataUrl);
      this.imageUrls.push(this.captureDataUrl);
      this.gotUrl.next(true);
    }, error => {
      this.errorMsg = error;
    });
  }

  upload() {
    let storageRef = firebase.storage().ref();
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);

    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`images/${filename}.jpg`);
  }



}
