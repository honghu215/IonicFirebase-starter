import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './../services/auth.service';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Subject, Observable } from 'rxjs';
import * as firebase from 'firebase';
import { AlertController, LoadingController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { map } from 'rxjs/operators';


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

  imageCollection: AngularFirestoreCollection<string>;
  images: Observable<string[]>;
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

    try {
      const imgInfo = await this.camera.getPicture(cameraOptions);

      const blobInfo = await this.makeFileIntoBlob(imgInfo);

      const uploadInfo: any = await this.upload(blobInfo);

      alert('File Upload Success ' + uploadInfo.fileName);
      console.log(this.imageUrls);
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
      message: 'Uploading...'
    });
    await loading.present();

    return new Promise((resolve, reject) => {
      let userId;
      this.storage.get(USERID_KEY).then( uid => {
        userId = uid;
      });
      console.log(userId);
      const fileRef = firebase.storage().ref(userId + '/' + imgBlobInfo.fileName);
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
          uploadTask.snapshot.ref.getDownloadURL().then( (downloadURL) => {
            const url = downloadURL;
            this.saveImageToDatabase(url);
            console.log('File available at', url);
            this.imageUrls.push(url);
            this.auth.latestUrl.next(url);
            loading.dismiss();
          });
        }
      );
    });
  }

  async saveImageToDatabase(downloadURL: string) {
    this.auth.saveImage(downloadURL);
    console.log('Uploading to firebase database');
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
