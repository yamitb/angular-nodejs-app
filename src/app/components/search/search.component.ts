import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import {FormControl,Validators, FormGroup} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ItemsService } from '../../services/items.service';
import { Item } from '../../models/Item';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';
import { SearchService } from '../../services/search.service';
import { PageEvent } from '../../../../node_modules/@angular/material';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  items: Item[];
  private authListenerSub: Subscription;
  private ItemsListenerSub: Subscription;
  userIsAuthanticated: boolean;
  user:User;
  totalItems = 0;
  itemsPerPage = 1;
  currentPage = 0;
  pageSizeOptions = [1];
  isLoading: boolean = false;
  item:Item;
  
  constructor(   
    private ItemsService: ItemsService,
    private authService: AuthService,
    private searchService: SearchService) { 

  }

  ngOnInit() {

    this.searchService.getItemListener().subscribe(item =>{
      this.item = item
    });

    
    this.ItemsListenerSub = this.searchService.getItemsUpdatedListener()
    .subscribe((itemsData: {items:Item[],itemsCount:number}) => {
      this.isLoading = false;
      this.items = itemsData.items;
      this.totalItems = itemsData.itemsCount;

      console.log("items from searchhhhhhhhhhhhhhh");
      console.log(this.items);

      // console.log("this.itemsPerPage " + this.itemsPerPage);
      // console.log("this.currentPage " + this.currentPage);
    });

    this.authListenerSub = this.authService.getAuthStatusListener().subscribe( isAuthaticated => {
      this.userIsAuthanticated = isAuthaticated;
      this.user = this.authService.getUser();
    });
  }

  onChangedPage(pageData: PageEvent){
    this.isLoading = true;
    this.currentPage = pageData.pageIndex;
    this.itemsPerPage = pageData.pageSize;

      console.log("thisssssssssssss item");
      console.log(this.item);
      this.searchService.searchItems(this.item,this.itemsPerPage,this.currentPage);
    

  }




}
