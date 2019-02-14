import { AlertController } from '@ionic/angular';
import { Image } from './image.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthData } from './auth-data.model';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Facebook } from '@ionic-native/facebook/ngx';

const USERID_KEY = 'UserEmail';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  latestUrl = new Subject<String>();
  private isAuthenticated = false;
  imageCollections: AngularFirestoreCollection<Image>;
  images: Observable<Image[]>;
  userId: string;

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private storage: Storage,
    private db: AngularFirestore,
    private alertClt: AlertController,
    private facebook: Facebook) {

    const ID = this.getUserId();
    console.log('Initializing DB... User ID: ', ID);
    // this.imageCollections = this.db.collection<Image>(ID);

  }


  saveImage(url: string) {
    console.log('Saving image to database...');
    this.imageCollections.add({
      url: url,
      createdAt: new Date().getTime()
    });
  }

  getImage(imageId) {
    return this.imageCollections.doc<Image>(imageId).valueChanges();
  }

  getImages() {
    if (window.localStorage.getItem(USERID_KEY) === null) {
      return new Observable<Image[]>();
    }
    const ID = this.getUserId();
    this.imageCollections = this.db.collection<Image>(ID);
    this.images = this.imageCollections.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data();
          const id = action.payload.doc.id;
          return {
            id: id,
            url: data.url,
            createdAt: data.createdAt
          };
        });
      })
    );
    return this.images;
  }

  registerUser(authData: AuthData) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(`Successfully create new account: ${JSON.stringify(result)}`);
        const user = firebase.auth().currentUser;
        if (user && !user.emailVerified) {
          user.sendEmailVerification().then(() => {
            this.alertMsg('Email Verification', '', 'Email Verification link is sent, go to check it in your mailbox', ['OK']);
            this.router.navigate(['/login']);
          }, error => {
            this.alertMsg('Sign up failed', '', error, ['OK']);
          });
        }
      })
      .catch(error => {
        this.alertMsg('Sign up failed', '', error, ['OK']);
      });
  }

  login(authData: AuthData) {
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        const user = firebase.auth().currentUser;
        if (!user.emailVerified) {
          this.alertMsg('Login failed', '', 'Email address is not verified, go check your mainbox', ['OK']);
        } else {
          this.userId = result.user.uid;
          this.saveUserId(result.user.email);
          this.authSuccessfully();
          this.getImages();
        }
      })
      .catch(error => {
        this.alertMsg('Login Failed', 'Error', error, ['OK']);
      });
  }

  async alertMsg(header: string, subHeader: string, message: string, buttons: string[]) {
    const alert = await this.alertClt.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: buttons
    });
    await alert.present();
  }

  logout() {
    this.authChange.next(false);
    this.isAuthenticated = false;
    window.localStorage.removeItem(USERID_KEY);
    this.images = new Observable<Image[]>();
    this.initDB();
    this.router.navigate(['/home']);
  }

  isAuth() {
    return this.isAuthenticated;
  }

  private initDB() {
    this.getImages();
  }

  private authSuccessfully() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/home']);
  }

  public saveUserId(id: string) {
    window.localStorage.removeItem(USERID_KEY);
    window.localStorage.setItem(USERID_KEY, id);
  }

  public getUserId(): string {
    return window.localStorage.getItem(USERID_KEY);
  }

  public async facebookLogin(): Promise<any> {
    return this.facebook.login(['email'])
      .then(response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);

        firebase.auth().signInAndRetrieveDataWithCredential(facebookCredential)
          .then(success => {
            this.saveUserId(success.user.email);
            this.authSuccessfully();
          })
          .catch(Error => {
            this.alertMsg('Login Failed', '', Error, ['OK']);
          });

      }).catch((error) => {
        this.alertMsg('Login Failed', '', error, ['OK']);
      });
  }

}
