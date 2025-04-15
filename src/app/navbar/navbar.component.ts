import { UsersService } from './../core/services/users/users.service';
import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IPosts } from '../core/interfaces/iposts';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn = input<boolean>(false)
  userLoggedIn: [] = []

  readonly usersService = inject(UsersService)

  ngOnInit() {
    this.usersService.saveUserData(); // populate userData on init
  }

  getUser(): [] {
    this.userLoggedIn = this.usersService.userData
    return this.userLoggedIn
  }
}