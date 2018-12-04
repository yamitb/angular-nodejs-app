import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/User';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user: User = {
    id: '',
    firstName: '',
    lastName: '',
    email: ''
  }

  isNew: boolean = true;
  disabledButtonSameForm: boolean = true;
  showUserForm: boolean = false;
  @ViewChild('userForm') form: any;

  userIdForEdit: string = '';
  userJoinedForEdit: string = '';

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    //Subscribe to the selectedUser observable
    this.usersService.selectedUser.subscribe(user => {
      if(user.id !== null){
         this.isNew = false;
         this.user.firstName = user.firstName;
         this.user.lastName = user.lastName;
         this.user.email = user.email;
         this.userIdForEdit = user.id;
         this.userJoinedForEdit = user.registered;
      }
    });
  }

  onSubmit({value, valid} : {value: User, valid: boolean}){
    if(!valid){
       console.log("Form is not valid!");
    } else if(this.isNew){
      value.isActive = true;
      value.registered = new Date();
      value.hide = true;
      value.id = null;
      this.usersService.addUser(value);
      this.form.reset();
    }
      else {
       //create user to update
        value.id = this.userIdForEdit;
        value.registered = this.userJoinedForEdit;
        value.hide = true;
        this.usersService.updateUser(value);
        this.form.reset();
        this.isNew = true;
    }
  }



}
