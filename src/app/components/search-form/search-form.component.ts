import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import {FormControl,Validators, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ItemsService } from '../../services/items.service';
import { Item } from '../../models/Item';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  private itemId:string;
  types:string[];
  colors:string[];
  cities:string[];
  sizes:string[];
  genders:string[];
  //mode:string = "create";
  typeFormControl = new FormControl('', Validators.required);
  colorFormControl = new FormControl('', Validators.required);
  cityFormControl = new FormControl('', Validators.required);
  sizeFormControl = new FormControl('', Validators.required);
  genderFormControl = new FormControl('', Validators.required);
  form: FormGroup;
  @Input() itemsPerPageItemForm: number;
  @Input() currentPageItemForm: number;
  user: User;
  totalItems = 0;
  itemsPerPage = 1;
  currentPage = 0;
  isNewSearch = true;

  item: Item = {
       id: null,
       type: null,
       color: null,
       size: null,
       city:null,
       gender: null,
       userId: null,
       imagePath: null
  }

  constructor(
    private ItemsService: ItemsService,
    private authService: AuthService,
    private searchService: SearchService
    ) { }

  ngOnInit() {

    console.log("gjkdhgkdfgvsearchhhhhhhhh formmmmmmmm");
    this.form = new FormGroup({
      'type': new FormControl(null,{
        validators: [Validators.required]
      }),
      'size': new FormControl(null,{
        validators: [Validators.required]
      }),
      'color': new FormControl(null,{
        validators: [Validators.required]
      }),
      'gender': new FormControl(null,{
        validators: [Validators.required]
      }),
      'city': new FormControl(null,{
        validators: [Validators.required]
      }),

    })

    this.getDataForItems();
    this.user = this.authService.getUser();
  }

  
  getDataForItems(){
    this.types = this.ItemsService.getTypes();
    this.colors = this.ItemsService.getColors();
    this.sizes = this.ItemsService.getSizes();
    this.cities = this.ItemsService.getCities();
    this.genders = this.ItemsService.getGenders();
  }

  onSubmit(){
    if(this.form.invalid){
      console.log("Form item is not valid!");
      return;
     }
    this.isNewSearch = false;
       this.item = {
       id: null,
       type: this.form.value.type,
       color: this.form.value.color,
       size: this.form.value.size,
       city:this.form.value.city,
       gender: this.form.value.gender,
       userId: this.user.id,
       imagePath: null
      }
      console.log(this.item);      
       this.searchService.searchItems(this.item, this.itemsPerPage,this.currentPage);
      //  .subscribe(() => {
      //     this.ItemsService.getIteams(this.itemsPerPageItemForm,this.currentPageItemForm);
      //  });

     this.form.reset();
    }
}


