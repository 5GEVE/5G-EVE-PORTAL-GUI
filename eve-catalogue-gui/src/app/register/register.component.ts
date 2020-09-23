import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService, RegistrationDetails, RoleDetails, Role } from '../auth.service';
import { UsersService, User } from '../users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],

 
})
export class RegisterComponent implements OnInit {
  hide = true;
  registrationFormGroup: FormGroup;
  roles: Role[];
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private usersService: UsersService
    ) { }
    ngOnInit() {
      this.getRoles();
      this.registrationFormGroup = this._formBuilder.group({
        email: ['', Validators.required],
        regUsername: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        role: ['', Validators.required],
        regPassword: ['', Validators.required]
      });

      var sheetToBeRemoved = document.getElementById('menu_show');
      var sheetParent = sheetToBeRemoved.parentNode;
      sheetParent.removeChild(sheetToBeRemoved);

      let elem: HTMLElement = document.getElementById('show_login');
      elem.setAttribute("style", "display:inline;");

      let elem1: HTMLElement = document.getElementById('show_reg');
      elem1.setAttribute("style", "display:none;");

    }

    getRoles(){
      this.authService.getRoles()
      .pipe()
      .subscribe(
          data => {
            //console.log(data['details']);
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
  
      this.authService.registerUser(email, username, firstName, lastName, password, role).subscribe(registrationDetails => {
        if (RegistrationDetails) {
          this.router.navigate(['login']);
        }
      });
    }

  }
 