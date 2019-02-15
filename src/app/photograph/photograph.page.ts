import { ItemModalPage } from './item-modal/item-modal.page';
import { PhotographService, MealItem } from './../services/photograph.service';
import { GoogleCloudVisionService } from './../services/google-cloud-vision.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

const allLabels = ['orange', 'banana', 'cabage'];
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

  nutritionItems: any;
  mealItem: MealItem;
  queryString: string;
  itemName: string;

  nutritionResult: any;
  itemString = ''; // 2 bowls of rice

  constructor(private alertCtl: AlertController,
    private modalCtrl: ModalController,
    private nav: NavController,
    private file: File,
    private camera: Camera,
    private loadingController: LoadingController,
    private auth: AuthService,
    private vision: GoogleCloudVisionService,
    private db: AngularFireDatabase,
    private photoService: PhotographService,
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
    console.log(4 + ' ' + 'apples');
  }

  async capture(sourceType: number) {
    this.init();
    let cameraOptions: CameraOptions;
    if (sourceType === 0) {
      cameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: sourceType,
        saveToPhotoAlbum: false
      };
    }
    if (sourceType === 1) {
      cameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: sourceType,
        saveToPhotoAlbum: true
      };
    }

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

  async visionAnalyze(imgUrl) {
    const analyzing = await this.loadingController.create({
      message: 'Analyzing...'
    });
    await analyzing.present();
    this.vision.getLabels(imgUrl).subscribe(result => {
      this.imageLabels = (result.responses[0].labelAnnotations);
      analyzing.dismiss();
      this.saveResults(imgUrl, result.responses);
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
    this.imageLabels.forEach(label => {
      console.log(label);
      if (allLabels.includes(label.description.toLowerCase())) {
        this.itemName = label.description;
        console.log(this.itemName);
      }
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

  async getNutrition() {
    // tslint:disable-next-line:max-line-length
    this.imageUrl = 'https://firebasestorage.googleapis.com/v0/b/njhack-8798c.appspot.com/o/huhong215%40gmail.com%2F2019-2-4-23%3A37%3A51cdv_photo_017.jpg?alt=media&token=31b245f8-a5ed-4440-a037-7dff146f9f4d';
    this.visionAnalyze(this.imageUrl);
  }

  close() {
    this.imageUrl = '';
    this.itemName = '';
    this.imageLabels = [];
    this.showAlert('Sorry', 'Please retake/select a photo');
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ItemModalPage,
      componentProps: {
        itemName: this.itemName
      },
      cssClass: 'modalCss'
    });
    modal.present();

    modal.onDidDismiss().then(res => {
      if (res.data == null) { return; }
      console.log(`Received data from modal: ${res.data.data}`);
      this.itemString = res.data.data;
      console.log(this.itemString);
      this.photoService.calculateNutrition(res.data.data).subscribe(response => {
        if (response.foods != null) {
          this.nutritionResult = response.foods[0];
        } else {
          this.showAlert('Error', response.message);
          this.init();
        }

      });
    });
  }

  init() {
    this.itemName = '';
    this.nutritionResult = {};
    this.imageLabels = [];
    this.itemString = '';
  }
}
