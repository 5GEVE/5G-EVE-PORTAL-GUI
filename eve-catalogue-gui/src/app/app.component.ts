import { Component } from '@angular/core';
import {  AfterContentChecked } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterContentChecked {
  title = 'responsive-mat';
  constructor(){

  }

  ngAfterContentChecked() {
 
    document.getElementById("cmain").style.marginBottom  = (  document.getElementById("footer").offsetHeight).toString()+"px" ;
     var element =document.getElementsByClassName("container");
     //console.log(element) 
     if(element.length==0)
     {
      document.getElementById("main-mat").style.backgroundColor ="#b3b3b3" ; 
     }
     else{
      document.getElementById("main-mat").style.backgroundColor ="#262626"
     }
     
  }
}
