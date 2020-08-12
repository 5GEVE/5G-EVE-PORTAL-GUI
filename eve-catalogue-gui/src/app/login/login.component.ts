import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService, RegistrationDetails, RoleDetails, Role } from '../auth.service';
import { UsersService, User } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginFormGroup: FormGroup;
  registrationFormGroup: FormGroup;
  roles: Role[];


  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,    private usersService: UsersService
    ) { }

  //TODO: The password must be at least 6 characters long.
  ngOnInit() {
    this.getRoles();
    this.loginFormGroup = this._formBuilder.group({
      username: ['',  [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.registrationFormGroup = this._formBuilder.group({
      email: ['',  [Validators.required, Validators.email]],
      regUsername: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['', Validators.required],
      regPassword: ['', [Validators.required, Validators.minLength(6)]],
      project: ['', Validators.required]
    });
  }


  login() {
    //this.router.navigate(['/portal_home'])
    var loginInfo = {};

    var email = this.loginFormGroup.get('username').value;
    var password = this.loginFormGroup.get('password').value;

    if (! this.loginFormGroup.get('username').hasError('email') && email && password) {
      loginInfo['email'] = email;
      loginInfo['password'] = password;
      this.authService.login(loginInfo, '/portal_home').subscribe(tokenInfo => {

        //console.log(JSON.stringify(tokenInfo, null, 4));
        //console.log(localStorage.getItem('token'));
        //console.log("ROLES: " + localStorage.getItem('roles'));
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

  register() {
    //var registrationInfo = {};

    var email = this.registrationFormGroup.get('email').value;
    var username = this.registrationFormGroup.get('regUsername').value;
    var firstName = this.registrationFormGroup.get('firstName').value;
    var lastName = this.registrationFormGroup.get('lastName').value;
    var role = this.registrationFormGroup.get('role').value;
    var password = this.registrationFormGroup.get('regPassword').value;
    var project = this.registrationFormGroup.get('project').value;

    this.authService.registerUser(email, username, firstName, lastName, password, role, project).subscribe(registrationDetails => {
      if (RegistrationDetails) {
        this.router.navigate(['/login']);
      }
    });
  }
}
