import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sites-switch',
  templateUrl: './sites-switch.component.html',
  styleUrls: ['./sites-switch.component.css']
})
export class SitesSwitchComponent implements OnInit {

  cardsRow1 = [
    { title: 'View Tickets', subtitle: '', cols: 1, rows: 1, path: '/tickets', icon: '../../assets/images/format_list_bulleted_white.png', btn: '' },
    { title: 'Manage Experiments', subtitle: '', cols: 1, rows: 1, path: '/experiments', icon: '../../assets/images/build_white.png', btn: '' },
  ];

  cardsRow2 = [
    { title: 'Deployment Requests', subtitle: '', cols: 1, rows: 1, path: '/vnf-service', icon: '../../assets/images/build_white.png', btn: '' }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
    let elem1: HTMLElement = document.getElementById('show_blue');
    elem1.setAttribute("style", "display:none;");
    let elem2: HTMLElement = document.getElementById('show_desc');
    elem2.setAttribute("style", "display:none;");
    let elem3: HTMLElement = document.getElementById('show_manage_site');
    elem3.setAttribute("style", "display:inline;");
  }

  goTo(path: string) {
    //console.log(path);
    localStorage.setItem('role', 'SITE_MANAGER');

    if (path.indexOf('http') >= 0) {
      window.open(path, '_blank');
    } else {
      this.router.navigate([path]);
    }
  }

}
