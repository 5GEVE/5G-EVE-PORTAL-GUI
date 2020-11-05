import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-files-service-second',
  templateUrl: './files-service-second.component.html',
  styleUrls: ['./files-service-second.component.css']
})

export class FilesServiceSecondComponent implements OnInit {

  constructor(private router: Router
    ) {}

  ngOnInit() {}

}



