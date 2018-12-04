import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable,Subject } from 'rxjs';
import { DisplaySettings } from '../models/DisplaySettings';
import { Image } from '../models/Image';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  images: Image[] = [
    {
      name: "Dog",
      sensor: "OGEN",
      x: 0,
      y: 30,
      clipX: 500,
      clipY: 100,
      clipW: 500,
      clipH: 500
    },
    {
      name: "Cat",
      sensor: "IKONOS",
      x: 500,
      y: 500,
      clipX: 500,
      clipY: 100,
      clipW: 500,
      clipH: 500
    },
    {
      name: "bull",
      sensor: "IKONOS",
      x: 0,
      y: 500,
      clipX: 500,
      clipY: 100,
      clipW: 500,
      clipH: 500
    },
    {
      name: "Frog",
      sensor: "IKONOS",
      x: 600,
      y: 0,
      clipX: 500,
      clipY: 100,
      clipW: 500,
      clipH: 500
    },

  ]

  DisplaySettings: string = '../../assets/display_settings.json';

  constructor(private http: HttpClient) { }

  getDisplaySettings() : Observable<DisplaySettings>{
    return this.http.get<any>(this.DisplaySettings);
  }

  getImages() : Observable<Image[]>{
   return of(this.images);
  }

}
