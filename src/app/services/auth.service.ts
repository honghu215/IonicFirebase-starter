import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthData } from './auth-data.model';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { AngularFireDatabase } from 'angularfire2/database';

const USERID_KEY = 'UserId';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;
  buckets: Observable<any[]>;
  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private storage: Storage,
              private db: AngularFireDatabase) { }

  registerUser(authData: AuthData) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then( result => {
        console.log(result);
        this.storage.set(USERID_KEY, result.user.uid);
        this.authSuccessfully();
      })
      .catch(error => {
        console.log(error);
      });
  }

  login(authData: AuthData) {
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then( result => {
        console.log(result);
        this.storage.set(USERID_KEY, result.user.uid);
        this.authSuccessfully();
      })
      .catch(error => {
        console.log(error);
      });
  }

  logout() {
    this.authChange.next(false);
    this.isAuthenticated = false;
    this.storage.remove(USERID_KEY);
  }

  isAuth() {
    return this.isAuthenticated;
  }

  private authSuccessfully() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/home']);
  }

  getBucketList() {
    // this.buckets = this.db.list('' + this.storage.get(USERID_KEY)).valueChanges();
    const buckets = this.db.list('images');
    console.log(buckets);
  }

}
