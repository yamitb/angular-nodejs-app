import { Injectable } from '@angular/core';
import { Item } from '../models/Item';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Subject, BehaviorSubject } from '../../../node_modules/rxjs';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + "/items/";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  items: Item[];
  itemsUpdated = new Subject<{items:Item[],itemsCount:number}>();
  private itemEditListener = new BehaviorSubject<Item>({
    id:null, type: null, size: null, color: null, city:null,gender:null,userId:null,imagePath:null
  });

  selectedItem = this.itemEditListener.asObservable();

  types:string[] = ['Evening dress','Day dress', 'Skirt', 'Shirt', 'Pants','Shorts','Overall'];
  colors:string[] = ['Blue','Red','Black','White','Green'];
  sizes:string[] = ['XS','S','M','L','XL'];
  genders:string[] = ['Female','Male'];
  cities:string[] = ['Acco','Tel-Aviv','Herzliya','Jerusalem'];
  maxItems = 0;


  constructor(private http:HttpClient) { }

  getTypes(){
    return this.types;
  }
  getColors(){
    return this.colors;
  }
  getSizes(){
    return this.sizes;
  }
  getGenders(){
    return this.genders;
  }
  getCities(){
    return this.cities;
  }


  getIteams(itemsPerPage: number, currentPage: number){
    const queryParams = `?pagesize=${itemsPerPage}&page=${currentPage}`;
    this.http.get<{message:string,items: any,maxItems:any}>(BACKEND_URL + queryParams).subscribe (responseData => {
      //console.log(responseData.maxItems);
      this.items = responseData.items;
      this.maxItems = responseData.maxItems;
      this.itemsUpdated.next({items: [...this.items], itemsCount: this.maxItems });
  });
  }

  getItemsUpdatedListener(){
    return this.itemsUpdated.asObservable();
  }

  

  addItem(item: Item, image: File) {
    const itemData = new FormData();
    itemData.append("type",item.type);
    itemData.append("size",item.size);
    itemData.append("color",item.color);
    itemData.append("gender",item.gender);
    itemData.append("city",item.city);
    itemData.append("image",image);
    console.log("add item srvice; ");
    return this.http.post<{ message: string, item: Item}>(BACKEND_URL, itemData);
    // .subscribe(responseData => {   
    //   item.id = responseData.item.id;
    //   item.imagePath = responseData.item.imagePath;
    //   this.items.push(item);
    //   this.itemsUpdated.next({items: [...this.items], itemsCount: this.maxItems + 1 });
    // }
    // );
  }

  removeItem(itemId: string){
    //  this.http.delete<{message:string}>('http://localhost:3000/items/' + itemId).subscribe(
    //    responseData =>{
    //       console.log(responseData.message);
    //       this.items = this.items.filter(item => item.id !== itemId);
    //       //this.itemsUpdated.next([...this.items]);
    //    }
    //  );

    return this.http.delete<{message:string}>(BACKEND_URL + itemId);

  }

  updateItem(item: Item, image: File | string ){
    console.log("update from service");
    let itemData: Item | FormData;
    if (typeof image === "object") {
      itemData = new FormData();
      itemData.append("id", item.id);
      itemData.append("type", item.type);
      itemData.append("size", item.size);
      itemData.append("color", item.color);
      itemData.append("gender", item.gender);
      itemData.append("city", item.city);   
      itemData.append("image", image);
      // itemData.append("image", image,item.type); change name of file
    } else {
      itemData = {
        id: item.id,
        type: item.type,
        size: item.size,
        color: item.color,
        gender: item.gender,
        city: item.city,
        userId: item.userId,
        imagePath: image
      };
    }

    //console.log(itemData);
    this.http.put<{ message: string,item:Item }>(BACKEND_URL, itemData).subscribe((responseData) => {
      this.items.forEach((cur, index) => {
        if (item.id === cur.id) {
          this.items.splice(index, 1);
        }
      });
      console.log("After subscriube service");
  
      item.imagePath = responseData.item.imagePath;
      console.log(item);
      this.items.unshift(item);
      this.itemsUpdated.next({items: [...this.items], itemsCount: this.maxItems});

  });
}

  editItem(item: Item){
     this.itemEditListener.next(item);
  }
}
