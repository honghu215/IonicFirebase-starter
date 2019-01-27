import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';



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

  constructor(private alertCtl: AlertController,
    private file: File,
    private camera: Camera) { }

  ngOnInit() {
    this.gotUrl.next(false);
  }

  async capture() {
    const cameraOptions: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      // sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
      saveToPhotoAlbum: true
    };

    try {
      const imgInfo = await this.camera.getPicture(cameraOptions);
      console.log(`***********Image Info*************\n ${imgInfo}`);
      const blobInfo = await this.makeFileIntoBlob(imgInfo);
      console.log(`***********Blod Info*************\n ${blobInfo}`);
      const uploadInfo: any = await this.upload(blobInfo);
      console.log(`***********Upload Info*************\n ${uploadInfo}`);
      alert('File Upload Success ' + uploadInfo);
    } catch (e) {
      console.log(e.message);
      alert('File Upload Error ' + e.message);
    }
  }

  makeFileIntoBlob(imgPath) {
    return new Promise((resolve, reject) => {
      let fileName = '';
      this.file
        .resolveLocalFilesystemUrl(imgPath)
        .then(fileEntry => {
          const { name, nativeURL } = fileEntry;

          // get the path..
          const path = nativeURL.substring(0, nativeURL.lastIndexOf('/'));
          console.log('path', path);
          console.log('fileName', name);

          fileName = name;

          // we are provided the name, so now read the file into
          // a buffer
          return this.file.readAsArrayBuffer(path, name);
        })
        .then(buffer => {
          // get the buffer and make a blob to be saved
          const imgBlob = new Blob([buffer], {
            type: 'image/jpeg'
          });
          console.log(imgBlob.type, imgBlob.size);
          resolve({
            fileName,
            imgBlob
          });
        })
        .catch(e => reject(e));
    });
  }
  upload(imgBlobInfo) {
    console.log('uploadToFirebase');
    return new Promise((resolve, reject) => {
      const fileRef = firebase.storage().ref('images/' + imgBlobInfo.fileName);

      const uploadTask = fileRef.put(imgBlobInfo.imgBlob);

      uploadTask.on(
        'state_changed',
        (_snapshot: any) => {
          console.log(
            'snapshot progess ' +
            (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100
          );
        },
        _error => {
          console.log(_error);
          reject(_error);
        },
        () => {
          // compconstion...
          resolve(uploadTask.snapshot);
          const data = uploadTask.snapshot.ref.toString();
          console.log(`***************Download Url****************** \n ${data}`);
          // console.log(`${data.downloadURLs[0]}, ${data.downloadURLs.length}, ${data.name}, ${data.size}`);
          // this.imageUrls.push(url);
        }
      );
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
