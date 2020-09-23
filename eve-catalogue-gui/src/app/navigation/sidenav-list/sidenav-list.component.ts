import { Component, OnInit ,EventEmitter,Output} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService, User } from '../../users.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],

})
export class SidenavListComponent implements OnInit {

  @Output() closeSideNavigation=new EventEmitter()
  username: string = '';

  constructor(private router: Router,
    private _location: Location,
    private usersService: UsersService,
    private authService: AuthService) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
  }

  onToggleClose(){
    this.closeSideNavigation.emit();
  }
  logout() {
    this.authService.logout('/login').subscribe(tokenInfo => console.log(JSON.stringify(tokenInfo, null, 4)));
  }

  getRole() {
    return localStorage.getItem('role');
  }
}
