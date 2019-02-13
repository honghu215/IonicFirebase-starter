import { GoogleCloudVisionService, VisionItem } from './../services/google-cloud-vision.service';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthService } from './../services/auth.service';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Subject, Observable } from 'rxjs';
import * as firebase from 'firebase';
import { AlertController, LoadingController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { tap, filter } from 'rxjs/operators';
import { Image } from '../services/image.service';
import { AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';

// tslint:disable-next-line:max-line-length
const imgUrl = 'https://firebasestorage.googleapis.com/v0/b/njhack-8798c.appspot.com/o/huhong215%40gmail.com%2F2019-2-2-20%3A49%3A7cdv_photo_012.jpg?alt=media&token=d4d38f27-5f2d-4416-be08-ee1f8a51f5d3';
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
  isLoggedin = false;

  imageCollection: AngularFirestoreCollection<string>;
  images: Image[];

  visionResult = '';
  pictureUrl = '';
  visionItems: AngularFireList<any>;
  items = [];
  result$: Observable<any>;
  task: AngularFireUploadTask;
  image: string;

  constructor(private alertCtl: AlertController,
    private file: File,
    private camera: Camera,
    private loadingController: LoadingController,
    private storage: Storage,
    private afstorage: AngularFireStorage,
    private auth: AuthService,
    private vision: GoogleCloudVisionService,
    private afs: AngularFirestore,
    private db: AngularFireDatabase) {
      this.visionItems = db.list('CloudVisionItems');
    }

  ngOnInit() {
    this.gotUrl.next(false);
    this.auth.authChange.subscribe(logStatus => {
      this.isLoggedin = logStatus;
    });
    this.auth.getImages().subscribe( data => {
      this.images = data;
    });
    // console.log(`Images: ${this.images.}`);
  }

  async capture() {
    const cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      // sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      saveToPhotoAlbum: true
    };

    // const base64 = await this.camera.getPicture(cameraOptions);
    // this.startUpload(base64);
    // this.camera.getPicture(cameraOptions).then( (imageData) => {
    //   this.pictureUrl = imageData;
    //   console.log(`Picure captured: ${imageData}`);
    //   this.vision.getLabels(imageData).subscribe(result => {
    //     console.log(result);
    //     this.saveResults(imageData, JSON.stringify(result));
    //     this.visionResult = JSON.stringify(result);
    //     console.log(`Cloud vision response: ${(result)}`);
    //   }, err => {
    //     console.log(`Cloud Vision error: ${err}`);
    //   });
    // }, err => {
    //   console.log(`Carema error: ${err}`);
    // });


    // this.vision.getLabels(imgUrl).subscribe( result => {
    //   const items = (result.responses);
    //   console.log(`Google Vision result: ${JSON.stringify(items)}`);
    //   this.saveResults(imgUrl, result.responses);
    // }, error => {
    //   console.log(error);
    // });
    try {
      const imgInfo = await this.camera.getPicture(cameraOptions);

      const blobInfo = await this.makeFileIntoBlob(imgInfo);

      const uploadInfo: any = await this.upload(blobInfo);

      alert('File Upload Success ' + uploadInfo.fileName);
    } catch (e) {
      console.log(e.message);
      alert('File Upload Error ' + e.message);
    }
  }

  // async startUpload(file: string) {
  //   const loading = await this.loadingController.create({
  //     message: 'Running AI vision analysis...'
  //   });
  //   await loading.present();

  //   const docId = this.afs.createId();
  //   const path = `${docId}.jpg`;
  //   const photoRef = this.afs.collection('photos').doc(docId);
  //   this.result$ = photoRef.valueChanges()
  //                   .pipe(
  //                     filter(data => !!data),
  //                     tap(_ => loading.dismiss())
  //                   );
  //   this.image = 'data:image/jpg;base64,' + file;
  //   this.task = this.afstorage.ref(path).putString(this.image, 'data_url');
  // }

  async showAlert(message) {
    const alert = await this.alertCtl.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });
    alert.present();
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


          fileName = name;
          console.log('path', path);
          console.log('fileName', name);
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
      const userId = this.auth.getUserId();
      const currDateTime = new Date();
      const fileName = currDateTime.getFullYear() + '-' + (currDateTime.getMonth() + 1) + '-' + currDateTime.getDay()
                    + '-' + currDateTime.getHours() + ':' + currDateTime.getMinutes() + ':' + currDateTime.getSeconds();
      const fileRef = firebase.storage().ref(userId + '/' + fileName + imgBlobInfo.fileName);
      const uploadTask = fileRef.put(imgBlobInfo.imgBlob);

      uploadTask.on('state_changed',
        (_snapshot: any) => {
          console.log('snapshot progess ' + (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100);
        },
        _error => {
          loading.dismiss();
          console.log(_error);
          reject(_error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            loading.dismiss();
            const url = downloadURL;
            this.visionAnalyze(url);
            // this.saveImageToDatabase(url);
            // this.imageUrls.push(url);
            // loading.dismiss();
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
    this.vision.getLabels(imageUrl).subscribe( result => {
      const items = (result.responses);
      console.log(`Google Vision result: ${JSON.stringify(items)}`);
      this.saveResults(imageUrl, result.responses);
      analyzing.dismiss();
    }, error => {
      console.log(error);
    });
  }

  async saveResults(imageUrl: string, results) {
    // push to local array
    this.items.push({
      imageUrl: imageUrl,
      results: results
    });

    // add to cloud database
    this.visionItems.push({
      imageUrl: imageUrl,
      results: results
    })
      .then( _ => {})
      .catch( error => {
        this.showAlert(error);
      });
  }

  async saveImageToDatabase(downloadURL: string) {
    this.auth.saveImage(downloadURL);
    console.log('Uploading to firebase database');
  }
  // async showSuccesfulUploadAlert() {
  //   const alert = await this.alertCtl.create({
  //     header: 'Success',
  //     subHeader: '',
  //     message: 'This picture is successfully uploaded!',
  //     buttons: ['OK']
  //   });
  //   await alert.present();
  //   this.captureDataUrl = '';
  // }



}
