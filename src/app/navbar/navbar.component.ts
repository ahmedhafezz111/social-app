import { UsersService } from './../core/services/users/users.service';
import { Component, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IPosts } from '../core/interfaces/iposts';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink ,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn = input<boolean>(false)
  userLoggedIn:[] =[]
   readonly usersService= inject(UsersService)

   getUser():[]{
     this.userLoggedIn =  this.usersService.userData
     return this.userLoggedIn
   }
}
