import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Image, ImageService } from './../services/image.service';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-photograph',
  templateUrl: './photograph.page.html',
  styleUrls: ['./photograph.page.scss'],
})
export class PhotographPage implements OnInit {
  gotUrl = new Subject<Boolean>();
  errorMsg = '';
  captureDataUrl = '';
  imageUrls = [];
  storageRef: any;

  constructor(private alertCtl: AlertController) { }

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

    Camera.getPicture(cameraOptions).then( (imagePath) => {
      // console.log(imagePath);
      this.captureDataUrl = 'data:image/jpeg;base64,' + imagePath;
      // console.log(this.captureDataUrl);
      this.imageUrls.push({
        url: this.captureDataUrl,
        checked: false
      });
      this.gotUrl.next(true);
      // this.upload();
    }, error => {
      this.errorMsg = error;
    });
  }

  upload() {
    this.storageRef = firebase.storage().ref();
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);

    // Create a reference to 'images/todays-date.jpg'
    const imageRef = this.storageRef.child(`images/${filename}.jpg`);
    imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
      this.showSuccesfulUploadAlert();
      console.log('Upload success.');
    });
  }

  async showSuccesfulUploadAlert() {
    const alert = await this.alertCtl.create({
      header: 'Uploaded!',
      subHeader: 'Picture is uploaded!',
      message: 'This picture is successfully uploaded!',
      buttons: ['OK']
    });
    await alert.present();
    this.captureDataUrl = '';
  }



}
