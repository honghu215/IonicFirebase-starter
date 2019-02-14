import { GoogleCloudVisionService } from './../services/google-cloud-vision.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import { AlertController, LoadingController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Component({
  selector: 'app-photograph',
  templateUrl: './photograph.page.html',
  styleUrls: ['./photograph.page.scss'],
})
export class PhotographPage implements OnInit {
  gotUrl = new Subject<Boolean>();
  isLoggedin = false;
  userId: string;

  dbItems: AngularFireList<any>;
  items = [];
  imageLabels = [];
  imageUrl = null;

  constructor(private alertCtl: AlertController,
              private file: File,
              private camera: Camera,
              private loadingController: LoadingController,
              private auth: AuthService,
              private vision: GoogleCloudVisionService,
              private db: AngularFireDatabase,
              private webView: WebView) {
    this.userId = this.auth.getUserId();
    this.dbItems = db.list(this.userId.split('@')[0]);
    this.dbItems.valueChanges().subscribe(items => {
      this.items = items;
    });
  }

  ngOnInit() {
    this.gotUrl.next(false);
    this.auth.authChange.subscribe(logStatus => {
      this.isLoggedin = logStatus;
    });
  }

  async capture(sourceType: number) {
    const cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,
      saveToPhotoAlbum: true
    };

    try {
      const imgInfo = await this.camera.getPicture(cameraOptions);
      this.imageUrl = this.webView.convertFileSrc(imgInfo);
      const blobInfo = await this.makeFileIntoBlob(imgInfo);
      await this.upload(blobInfo);
    } catch (e) {
      if (e.message != null) {
        this.showAlert('Error', e.message);
      }
    }
  }

  async makeFileIntoBlob(imgPath) {
    return new Promise((resolve, reject) => {
      let fileName = '';
      this.file
        .resolveLocalFilesystemUrl(imgPath)
        .then(fileEntry => {
          const { name, nativeURL } = fileEntry;
          const path = nativeURL.substring(0, nativeURL.lastIndexOf('/'));
          fileName = name;
          // we are provided the name, so now read the file into a buffer
          return this.file.readAsArrayBuffer(path, name);
        })
        .then(buffer => {
          // get the buffer and make a blob to be saved
          const imgBlob = new Blob([buffer], {
            type: 'image/jpeg'
          });
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
      // const userId = this.auth.getUserId();
      const currDateTime = new Date();
      const fileName = currDateTime.getFullYear() + '-' + (currDateTime.getMonth() + 1) + '-' + currDateTime.getDay()
        + '-' + currDateTime.getHours() + ':' + currDateTime.getMinutes() + ':' + currDateTime.getSeconds();
      const fileRef = firebase.storage().ref(this.userId + '/' + fileName + imgBlobInfo.fileName);
      const uploadTask = fileRef.put(imgBlobInfo.imgBlob);

      uploadTask.on('state_changed',
        (_snapshot: any) => {
          console.log('snapshot progess ' + (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100);
        },
        _error => {
          loading.dismiss();
          reject(_error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            loading.dismiss();
            // this.imageUrl = downloadURL;
            this.visionAnalyze(downloadURL);
          });
        }
      );
    });
  }

  async visionAnalyze(imageUrl) {
    const analyzing = await this.loadingController.create({
      message: 'Analyzing...'
    });
    await analyzing.present();
    this.vision.getLabels(imageUrl).subscribe(result => {
      this.imageLabels = (result.responses[0].labelAnnotations);
      this.saveResults(imageUrl, result.responses);
      analyzing.dismiss();
    }, error => {
      console.log(error);
    });
  }

  async saveResults(imageUrl: string, results) {
    this.dbItems.push({
      imageUrl: imageUrl,
      results: results
    })
      .then(_ => { })
      .catch(error => {
        this.showAlert('Error', error);
      });
  }

  async saveImageToDatabase(downloadURL: string) {
    this.auth.saveImage(downloadURL);
  }

  async showAlert(header, message) {
    const alert = await this.alertCtl.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    alert.present();
  }
}
