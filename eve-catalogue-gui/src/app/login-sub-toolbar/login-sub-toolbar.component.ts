import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService, User } from '../users.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-sub-toolbar',
  templateUrl: './login-sub-toolbar.component.html',
  styleUrls: ['./login-sub-toolbar.component.css']
})
export class LoginSubToolbarComponent implements OnInit {

  username: string = '';

  constructor(private router: Router,
    private _location: Location,
    private usersService: UsersService,
    private authService: AuthService) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
  }

  goTo() {
      this.router.navigate(['/register']);
  }


  logout() {
    this.authService.logout('/login').subscribe(tokenInfo => console.log(JSON.stringify(tokenInfo, null, 4)));
  }
}
