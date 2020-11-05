import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environments';

@Component({
  selector: 'app-experiment-switch',
  templateUrl: './experiment-switch.component.html',
  styleUrls: ['./experiment-switch.component.css']
})
export class ExperimentSwitchComponent implements OnInit {

  constructor(private router: Router) { }

  ibnBaseUrl = environment['ibnBaseUrl'];

  ngOnInit() {
    let elem1: HTMLElement = document.getElementById('show_blue');
    elem1.setAttribute("style", "display:none;");
  }


  openExtLink() {
    window.open(this.ibnBaseUrl);
  }

  goTo(path: string) {
    if (path.indexOf('http') >= 0) {
      window.open(path, '_blank');
    } else {
      this.router.navigate([path]);
    }
  }

}
