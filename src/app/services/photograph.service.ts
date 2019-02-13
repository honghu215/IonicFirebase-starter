import { AuthService } from './auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotographService {
  visionResults: AngularFireList<any>;
  visionItems = [];
  userId: string;

  constructor(private db: AngularFireDatabase,
              private afs: AngularFirestore,
              private auth: AuthService) {

                this.userId = this.auth.getUserId();
                this.visionResults = db.list(this.userId.split('@')[0]);
                this.visionResults.valueChanges().subscribe( items => {
                  
                })
              }
}
