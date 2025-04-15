import { Component, inject } from '@angular/core';
import { UsersService } from '../core/services/users/users.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IPosts } from '../core/interfaces/iposts';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink ,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
   readonly usersService= inject(UsersService)
}
