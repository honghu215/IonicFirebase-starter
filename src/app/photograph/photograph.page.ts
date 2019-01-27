import { AuthService } from './../services/auth.service';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import { AlertController, LoadingController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';


const USERID_KEY = 'UserId';
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
  downloadUrl = '';

  constructor(private alertCtl: AlertController,
    private file: File,
    private camera: Camera,
    private loadingController: LoadingController,
    private storage: Storage,
    private auth: AuthService) { }

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

    // const imgInfo = await this.camera.getPicture(cameraOptions);
    // this.camera.getPicture(cameraOptions).then( imgPath => {

    //   this.imageUrls.push('data:image/jpeg;base64,' + imgPath);
    //   const blobInfo = this.makeFileIntoBlob(imgPath);
    // }, error => {
    //   console.log(error);
    // });
    // const storageRef = firebase.storage().ref();
    // const uploadTask = storageRef.child(`${this.storage.get(USERID_KEY)}/${Math.floor(Date.now() / 1000)}`).put(imgInfo);
    try {
      const imgInfo = await this.camera.getPicture(cameraOptions);

      this.imageUrls.push(imgInfo);
      const blobInfo = await this.makeFileIntoBlob(imgInfo);

      const uploadInfo: any = await this.upload(blobInfo);

      alert('File Upload Success ' + uploadInfo.fileName);
    } catch (e) {
      console.log(e.message);
      alert('File Upload Error ' + e.message);
    }
  }




  async makeFileIntoBlob(imgPath) {
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
  async upload(imgBlobInfo) {
    const loading = await this.loadingController.create({
      message: 'Uploading to firebase...'
    });
    await loading.present();

    return new Promise((resolve, reject) => {
      const fileRef = firebase.storage().ref('images/' + imgBlobInfo.fileName);
      const uploadTask = fileRef.put(imgBlobInfo.imgBlob);

      uploadTask.on('state_changed',
        (_snapshot: any) => {
          console.log('snapshot progess ' + (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100);
        },
        _error => {
          console.log(_error);
          reject(_error);
        },
        () => {
          loading.dismiss();
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log('File available at', downloadURL);
          });
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
