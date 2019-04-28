import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import {FormControl,Validators, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ItemsService } from '../../services/items.service';
import { Item } from '../../models/Item';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';
import { mimeType } from "./mime-type.validator"

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
  private itemId:string;
  types:string[];
  colors:string[];
  cities:string[];
  sizes:string[];
  genders:string[];
  imagePreview:string;
  mode:string = "create";
  typeFormControl = new FormControl('', Validators.required);
  colorFormControl = new FormControl('', Validators.required);
  cityFormControl = new FormControl('', Validators.required);
  sizeFormControl = new FormControl('', Validators.required);
  genderFormControl = new FormControl('', Validators.required);
  //@ViewChild('itemForm') form: any;
  form: FormGroup;
  @Input() itemsPerPageItemForm: number;
  @Input() currentPageItemForm: number;


  // item: Item = {
  //   id: '',
  //   type: '',
  //   color:'',
  //   size:'',
  //   city:'',
  //   gender: '',
  //   userId: ''
  // }

  user: User;

  
  constructor(private ItemsService: ItemsService,private authService: AuthService){}

  ngOnInit() {
    this.ItemsService.selectedItem.subscribe(item => {
        if(item.id !== null){
          this.mode = "edit";
          this.itemId = item.id;
          this.form.setValue({
            type: item.type,
            size: item.size,
            color:item.color,
            gender:item.gender,
            city:item.city,
            image:item.imagePath
          });
          this.imagePreview = this.form.value.image;
          
        }else{
          this.mode = "create";
          this.itemId = null;
        }
    });


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
      'image': new FormControl(null,{
        validators: [Validators.required],
        asyncValidators: [mimeType]
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

  onImagePicked(event: Event){
   const file = (event.target as HTMLInputElement).files[0];
   this.form.patchValue({image:file});
   this.form.get('image').updateValueAndValidity();
   const reader = new FileReader();
   reader.onload = () => {
     this.imagePreview = reader.result;
   }
   reader.readAsDataURL(file);


  }

  onSubmit(){
    if(this.form.invalid){
      console.log("Form item is not valid!");
      return;
     }
     if(this.mode === "create"){
      console.log("create mode");
      console.log(this.form.value.image);
       let item: Item = {
       id: null,
       type: this.form.value.type,
       color: this.form.value.color,
       size: this.form.value.size,
       city:this.form.value.city,
       gender: this.form.value.gender,
       userId: this.user.id,
       imagePath: null
      }
      console.log(item);      
       this.ItemsService.addItem(item, this.form.value.image).subscribe(() => {
          this.ItemsService.getIteams(this.itemsPerPageItemForm,this.currentPageItemForm);
       });
     }else{
      console.log("edit mode");
      console.log(this.form.value.image);
      let item: Item = {
      id: this.itemId,
      type: this.form.value.type,
      color: this.form.value.color,
      size: this.form.value.size,
      city:this.form.value.city,
      gender: this.form.value.gender,
      userId: this.user.id,
      imagePath: null
     }
     console.log(item);      
     console.log(this.form.value.image);  
     this.ItemsService.updateItem(item, this.form.value.image);
    
     }
     this.mode = "create";
     this.form.reset();
    }
}
