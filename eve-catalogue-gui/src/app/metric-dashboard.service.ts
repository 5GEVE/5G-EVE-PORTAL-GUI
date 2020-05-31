import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './environments/environments';
import {ExperimentUrls} from './experiment-metric-dashboard/experiment-urls';
// import { NsdInfo } from './nfv-components/nfv-ns/nsd-info';
import { load } from 'js-yaml';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MetricDashboardService {

  private baseUrl = environment.dcsBaseUrl;

  constructor(private http: HttpClient) { }

  getDashboardsUrls(expId: string): Observable<ExperimentUrls> {
    return this.http.get<ExperimentUrls>(this.baseUrl + expId)
      .pipe(
        tap(_ => console.log('fetched experimentUrls - SUCCESS')),
        catchError(null)
      );
  }


}
