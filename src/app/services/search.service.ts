import { Injectable, OnInit } from '@angular/core';
import { Item } from '../models/Item';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Subject, BehaviorSubject } from '../../../node_modules/rxjs';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + "/search/";

@Injectable({
  providedIn: 'root'
})
export class SearchService{

  items: Item[];
  itemsUpdated = new Subject<{items:Item[],itemsCount:number}>();

  itemListener = new Subject<Item>();
  // private itemEditListener = new BehaviorSubject<Item>({
  //   id:null, type: null, size: null, color: null, city:null,gender:null,userId:null,imagePath:null
  // });

  // selectedItem = this.itemEditListener.asObservable();
  maxItems = 0;

  constructor(private http: HttpClient) { }


  searchItems(item: Item, itemsPerPage: number, currentPage: number){
    console.log("Item from search");
    console.log(item);
    console.log(itemsPerPage);
    console.log(currentPage);

    const queryParams1 = `?pagesize=${itemsPerPage}&page=${currentPage}`;

    const queryParams = `?type=${item.type}&size=${item.size}&color=${item.color}&gender=${item.gender}&city=${item.city}&pagesize=${itemsPerPage}&page=${currentPage}`;
    console.log(queryParams);
    this.http.get<{message:string,items: any,maxItems:any}>(BACKEND_URL + queryParams).subscribe (responseData => {
      //console.log(responseData.maxItems);
      this.items = responseData.items;
      this.maxItems = responseData.maxItems;
      console.log("this.maxItems");
      console.log(this.maxItems);
      this.itemsUpdated.next({items: [...this.items], itemsCount: this.maxItems });
      this.itemListener.next(item);
  });
  }

  getItemsUpdatedListener(){
    return this.itemsUpdated.asObservable();
  }

  getItemListener(){
    console.log("getItemListener");
    return this.itemListener.asObservable();
  }
}
