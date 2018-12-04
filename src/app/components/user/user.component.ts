import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.Component.css'],
})

export class UserComponent implements OnInit{
   user: User;
   isLoading = false;


  constructor(
    private userService: UsersService,
    private route: ActivatedRoute
  ) 
  {}

  ngOnInit(){
    const userId = this.route.snapshot.paramMap.get('id');
    this.user = this.userService.getUser(userId);
  }
  
}

  

