import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService, RegistrationDetails, RoleDetails, Role } from '../auth.service';
import { UsersService, User } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  
  hide = true;
  loginFormGroup: FormGroup;
  roles: Role[];

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private usersService: UsersService
    ) { }

  ngOnInit() {
    this.getRoles();
    this.loginFormGroup = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    var sheetToChangeStyle = document.getElementById('show_reg');
    sheetToChangeStyle.style.display = 'inline';
    var sheetToChangeStyle = document.getElementById('show_login');
    sheetToChangeStyle.style.display = 'none';

    var sheetToBeRemoved = document.getElementById('menu_show');
    var sheetParent = sheetToBeRemoved.parentNode;
    sheetParent.removeChild(sheetToBeRemoved);

  }

  login() {
    //this.router.navigate(['home'])

    var loginInfo = {};

    var email = this.loginFormGroup.get('username').value;
    
    var password = this.loginFormGroup.get('password').value;
    if (email && password) {
      loginInfo['email'] = email;
      loginInfo['password'] = password;
     /*
     JSON.stringify(tokenInfo, null, 4),
        localStorage.getItem('token'),
         localStorage.getItem('roles') */
      this.authService.login(loginInfo, '/home').subscribe(tokenInfo => {
        
      });
    }    
  }

  getRoles(){
    this.authService.getRoles()
    .pipe()
    .subscribe(
        data => {
          console.log(data['details']);
          this.roles = data['details'];
        },
        error => {
          console.log('RegisterComponent > Error retrieving roles during registration - ' + error);
      });    
  }
}
