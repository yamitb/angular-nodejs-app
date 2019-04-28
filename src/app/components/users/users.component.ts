import { Component, OnInit, ViewChild} from '@angular/core';
import { User } from '../../models/User';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user: User = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    age: null,
    address: {
      street: '',
      city: ''
    }
  }
  users: User[];
  showExtended: boolean = true;
  enableAdd: boolean = false;
  showUserForm: boolean = false;
  disabledButtonSameForm: boolean = true;
  currentClasses = {};
  currentStyles = {};
  @ViewChild('userForm') form: any;
  isLoading = false;
  userIsAuthenticated = false;
  private authListenerSub: Subscription;

  constructor(private usersService: UsersService,private authService: AuthService) { 
    
  }

  ngOnInit() {
    this.usersService.getUsers();
    this.isLoading = true;
    this.usersService.getUsersUpdatedListener().subscribe((users: User[]) => {
      this.isLoading = false;
      this.users = users;
    });
    
    //this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSub = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated =>{
      this.userIsAuthenticated = isAuthenticated;
    });
  
    this.setCurrentClasses();
    this.setCurrentstyles();
  }

  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
  }

  setCurrentClasses(){
    this.currentClasses = {
      'btn-success': this.enableAdd,
      'big-text': this.enableAdd
    }
  }
  setCurrentstyles(){
    this.currentStyles = {
      'padding-top': this.showExtended ? '0px' : '30%',
      'font-size': this.showExtended ? '' : '40px'
    }
  }

  // addUser(){
  //   this.user.isActive = true;
  //   this.user.registered = new Date();
  //   this.user.balance = 500;
  //   this.users.unshift(this.user);
  //   this.user = {
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     age: null,
  //     address: {
  //       street: '',
  //       city: ''
  //     }
  //   }
  // }

  onSubmit({value, valid} : {value: User, valid: boolean}){
    if(!valid){
       console.log("Form is not valid!");
    }else {
      value.isActive = true;
      value.registered = new Date();
      value.hide = true;
      
      //this.users.unshift(value);

      this.usersService.addUser(value);
      this.form.reset();
    }
  }

  editUser(user: User){
    this.usersService.editUser(user);
  }

  removeUser (userId: string){
    if(confirm('Are you sure?')){
      console.log(userId);
      this.usersService.removeUser(userId);
    }
  }
  

  mouseout1(e){
    //console.log(e.type);
   // e.preventDefault();
  }

  // toggleHide(user: User){
  //  user.hide = !user.hide;
  // }

  fireEvent(e){
    //input event in the html: (keyup) (keydown) (focus) 
    //(keypress)  (blur) (cut) (paste) (copy) (cut)
   //console.log(e.type);
   //console.log(e.target.value);
  }


}
