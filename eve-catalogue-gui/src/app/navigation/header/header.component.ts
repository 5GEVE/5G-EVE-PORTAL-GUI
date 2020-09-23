import { Component, OnInit , EventEmitter,Output} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sideNavigationToggle = new EventEmitter();
  urlInfo : string;
  linkDash:boolean;
  constructor(private router: Router) {
}
  ngOnInit(): void {
    /*
    this.router.events.subscribe((routerData) => {
      this.urlInfo=routerData['url'];
      if(this.urlInfo=='/login')
      this.linkDash=true;
      else{
        this.linkDash=false;
      }
   })   
   */
  }
  
  onToggleOpenSidenav(){
    this.sideNavigationToggle.emit()

  }
  changeStyleReg(){
    let elem1: HTMLElement = document.getElementById('show_reg');
    elem1.setAttribute("style", "display:none;");

    let elem: HTMLElement = document.getElementById('show_login');
    elem.setAttribute("style", "display:inline;");
  }
  changeStyleLog(){
    let elem1: HTMLElement = document.getElementById('show_reg');
    elem1.setAttribute("style", "display:inline;");

    let elem: HTMLElement = document.getElementById('show_login');
    elem.setAttribute("style", "display:none;");
  }
  
}
