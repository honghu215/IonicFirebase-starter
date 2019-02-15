import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';

export interface MealItem {
  name: string;
  total_fat: number;
  saturated_fat: number;
  cholesterol: number;
  sodium: number;
}
const nutritionixUrl = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
@Injectable({
  providedIn: 'root'
})
export class PhotographService {
  dbItems: AngularFireList<any>;
  visionItems = [];
  userId: string;

  constructor(private db: AngularFireDatabase,
              private afs: AngularFirestore,
              private auth: AuthService,
              private http: HttpClient) {

                this.userId = this.auth.getUserId();
                this.dbItems = db.list(this.userId.split('@')[0]);
                this.dbItems.valueChanges().subscribe( items => {
                  this.visionItems = items;
                });
              }

  calculateNutrition(queryStr: string) {
    return this.http.post<any>(nutritionixUrl,
                  { query: queryStr },
                  {
                    headers: new HttpHeaders({
                      'Content-Type': 'application/json',
                      'x-app-id': environment['x-app-id'],
                      'x-app-key': environment['x-app-key']
                    }),
                    responseType: 'json'
                  });
  }
}
