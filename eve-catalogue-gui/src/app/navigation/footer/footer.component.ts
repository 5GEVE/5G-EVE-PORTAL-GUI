import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }
  socialNetworks=[
    {"name":"facebook","src":"https://img.icons8.com/material/24/000000/facebook.png"},
    {"name":"Linkedin","src":"https://img.icons8.com/material/24/000000/linkedin.png"},
    {"name":"google plus","src":"https://img.icons8.com/material/24/000000/google-plus.png"},
    {"name":"youtube","src":"https://img.icons8.com/material/24/000000/youtube.png"},
    {"name":"twitter","src":"https://img.icons8.com/material/24/000000/twitter-squared.png"}
  ];
  footerInfo=[
    {"title":"5G EVE portal",
    "link":"https://portal.5g-eve.eu",
    "context":"Portal to to design, manage and monitor experiments over the 5G EVE end-to--end facility infrastructures."},
    {"title":"5G EVE Documentation",
    "link":"https://www.it.uc3m.es/jgr/5G-EVE/5G_EVE_Portal_User_Manual.pdf",
    "context":"Documentation for experimenters and developers operating on 5G EVE."},
    {"title":"Report Issues",
    "link":"https://portal.5g-eve.eu/#/tickets",
    "context":"Issue tracker for 5G EVE experimenters."}
  ];
  ngOnInit(): void {
  }

}
