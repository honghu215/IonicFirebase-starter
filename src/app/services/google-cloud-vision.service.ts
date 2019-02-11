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

  async getLabels(base64Image) {
    const body = {
      'requests': [
        {
          'image': {
            'content': base64Image
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
    return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + environment.googleCloudVisionAPIKey, body,
                                {headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }
}
