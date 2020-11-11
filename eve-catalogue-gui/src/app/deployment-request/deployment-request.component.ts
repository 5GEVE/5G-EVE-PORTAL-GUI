import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deployment-request',
  templateUrl: './deployment-request.component.html',
  styleUrls: ['./deployment-request.component.css']
})

export class DeploymentRequestComponent implements OnInit {

  constructor(private router: Router
    ) {}

  ngOnInit() {
    if (localStorage.getItem('logged') != "true") {
      this.router.navigate(['/login']);
    }
  }

}



