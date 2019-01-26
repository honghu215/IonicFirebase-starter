import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Image, ImageService } from './../services/image.service';
import { Subject } from 'rxjs';


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
    };
    Camera.getPicture(cameraOptions).then( imagePath => {
      this.captureDataUrl = imagePath;
      this.gotUrl.next(true);
    }, error => {
      console.log(error);
      this.errorMsg = error;
    });
    // this.camera.getPicture((data) => {
    //   this.captureDataUrl = data;
    // }, error => {
    //   console.log(error);
    //   this.errorMsg = error;
    // }, cameraOptions);
  }



}
