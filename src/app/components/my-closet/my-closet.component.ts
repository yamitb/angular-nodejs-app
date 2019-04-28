import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import { DisplaySettings } from '../../models/DisplaySettings';
import { Image } from '../../models/Image';
import { TryCatchStmt } from '@angular/compiler';
import { ItemsService } from '../../services/items.service';
import { Item } from '../../models/Item';
import { Subscription } from '../../../../node_modules/rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';
import { PageEvent } from '../../../../node_modules/@angular/material';

@Component({
  selector: 'app-my-closet',
  templateUrl: './my-closet.component.html',
  styleUrls: ['./my-closet.component.css']
})

export class MyClosetComponent implements OnInit {

  items: Item[];
  private authListenerSub: Subscription;
  private ItemsListenerSub: Subscription;
  userIsAuthanticated: boolean;
  user:User;
  totalItems = 0;
  itemsPerPage =1;
  currentPage = 0;
  pageSizeOptions = [1,2,5,10];
  isLoading: boolean = true;



  constructor(private itemsService: ItemsService, private authService: AuthService){}

  ngOnInit(){
    this.isLoading = true;
    this.itemsService.getIteams(this.itemsPerPage,this.currentPage);
    this.ItemsListenerSub = this.itemsService.getItemsUpdatedListener()
    .subscribe((itemsData: {items:Item[],itemsCount:number}) => {
      this.isLoading = false;
      this.items = itemsData.items;
      this.totalItems = itemsData.itemsCount;
      console.log("this.itemsPerPage " + this.itemsPerPage);
      console.log("this.currentPage " + this.currentPage);
    });

    this.authListenerSub = this.authService.getAuthStatusListener().subscribe( isAuthaticated => {
      this.userIsAuthanticated = isAuthaticated;
      this.user = this.authService.getUser();
    });
  }

  removeItem(itemId: string){
    if(confirm('Are you sure?')){
      console.log(itemId);
      this.itemsService.removeItem(itemId).subscribe(() => {
      this.itemsService.getIteams(this.itemsPerPage,this.currentPage);
      });
    }   
  }

  editItem(item:Item){
     this.itemsService.editItem(item);
  }

  onChangedPage(pageData: PageEvent){
    this.isLoading = true;
    this.currentPage = pageData.pageIndex;
    this.itemsPerPage = pageData.pageSize;
    this.itemsService.getIteams(this.itemsPerPage,this.currentPage);
  }
}