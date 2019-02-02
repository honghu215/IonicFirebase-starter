import { Injectable } from '@angular/core';

export interface Image {
  id?: string;
  url: string;
  createdAt?: number;
}
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }
}
