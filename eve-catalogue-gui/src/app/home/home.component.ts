import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService, User } from '../users.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  username: string = '';
  roles: string = ''; 

  constructor(private router: Router,
    private usersService: UsersService,
    private authService: AuthService) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.roles = this.getRoles();
    let elem1: HTMLElement = document.getElementById('show_blue');
    elem1.setAttribute("style", "display:inline;");
    let elem2: HTMLElement = document.getElementById('show_desc');
    elem2.setAttribute("style", "display:inline;");
    let elem3: HTMLElement = document.getElementById('show_manage_site');
    elem3.setAttribute("style", "display:none;");
  }

  goTo(path: string) {
    if (path.indexOf('/design_experiment') >= 0) {
      localStorage.setItem('role', 'DESIGNER');
    }
    if (path.indexOf('/request_experiment') >= 0) {
      localStorage.setItem('role', 'EXPERIMENTER');

    }
    if (path.indexOf('/experiments') >= 0) {
      localStorage.setItem('role', 'EXPERIMENTER');
    }
    if (path.indexOf('/manage_site') >= 0) {
      localStorage.setItem('role', 'SITE_MANAGER');
    }
    this.router.navigate([path]);
  }

  logout() {
    this.authService.logout('/login').subscribe(tokenInfo => console.log(JSON.stringify(tokenInfo, null, 4)));
  }

  getRoles() {
    return localStorage.getItem('roles');
  }

}
