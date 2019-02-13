import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface VisionItem {
  imageData: any;
  result: string;
}

@Injectable({
  providedIn: 'root'
})
export class GoogleCloudVisionService {

  constructor(private http: HttpClient) { }

  getLabels(imageUrl): Observable<any> {
    const body = {
      'requests': [
        {
          'image': {
            'source': {
              'imageUri': imageUrl
            }
          },
          'features': [
            {
              'type': 'LABEL_DETECTION'
            }
          ]
        }
      ]
    };
    console.log(`Requesting vision...`);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    };
    return this.http.post<any>('https://vision.googleapis.com/v1/images:annotate?key=' + environment.googleCloudVisionAPIKey, body,
                        { headers: new HttpHeaders({'Content-Type': 'application/json'}), responseType: 'json' });
  }
}
