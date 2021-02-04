import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {MetricDashboardService} from '../metric-dashboard.service';
import { ExperimentUrls } from './experiment-urls';
import { IFrameService}  from '../iframe.service';



@Component({
  selector: 'app-experiment-metric-dashboard',
  templateUrl: './experiment-metric-dashboard.component.html',
  styleUrls: ['./experiment-metric-dashboard.component.css']
})
export class ExperimentMetricDashboardComponent implements OnInit {
  dashboards: SafeResourceUrl[] = [];
  experimentUrls: ExperimentUrls ;

  constructor(private sanitizer: DomSanitizer,
              private iFrame: IFrameService,
              private metricDashboardService: MetricDashboardService ) {

  }

  ngOnInit() {
    var expId = localStorage.getItem('expId');

    this.getDashboards(expId);


  }

  getDashboards(expId: string) {

    // until we got the details, let's use some youtube video
    // for (var i = 0; i < 10; i++){
    //   this.dashboards.push(this.sanitizer.bypassSecurityTrustResourceUrl("https://en.wikipedia.org/wiki/IMT-2020"));
    // }

    this.metricDashboardService.getDashboardsUrls(expId).subscribe((metricUrls: ExperimentUrls) =>
    {
        this.experimentUrls = metricUrls;
        for (var i = 0; i < this.experimentUrls.urls.length; i++){
           this.dashboards.push(this.sanitizer.bypassSecurityTrustResourceUrl(this.experimentUrls.urls[i]['url']));
        }

    });

  }

}


