import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ExperimentInfo } from './experiments/experiment-info';
import { environment } from './environments/environments';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ExperimentsService {

  private baseUrl = environment.lcmBaseUrl;
  private experimentInfoUrl = 'experiment';

  httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
  };


  httpOptionsWithAccept:Object = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json',
        Accept: 'text/plain;charset=ISO-8859-1',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }),
      responseType: 'text'
  };

  constructor(private http: HttpClient,
    private authService: AuthService,
    private router: Router) { }

  getExperiments(): Observable<ExperimentInfo[]> {
    return this.http.get<ExperimentInfo[]>(this.baseUrl + this.experimentInfoUrl, this.httpOptions)
      .pipe(
        tap(_ => console.log('fetched experimentInfos - SUCCESS')),
        catchError(this.authService.handleError<ExperimentInfo[]>('getExperiments', []))
      );
  }

  getExperiment(experimentId: string, expDId): Observable<ExperimentInfo[]> {
    var requestParams = '';
    if (experimentId != null) {
      requestParams += '?expId=' + experimentId;
    }
    if (expDId != null) {
      requestParams += '?expDId=' + expDId;
    }
    return this.http.get<ExperimentInfo[]>(this.baseUrl + this.experimentInfoUrl + requestParams, this.httpOptions)
      .pipe(
        tap(_ => console.log('fetched experimentInfos - SUCCESS')),
        catchError(this.authService.handleError<ExperimentInfo[]>('getExperiment', []))
      );
  }

  postExperiment(expRequest: object, redirection: string): Observable<any> {
    return this.http.post(this.baseUrl + this.experimentInfoUrl, expRequest,  this.httpOptionsWithAccept)
      .pipe(
        tap(
          experimentId => {
            this.authService.log(`created Experiment w/ id=${experimentId}`, 'SUCCESS', false);
            // this.router.navigate([redirection]).then(() => {
            //   window.location.reload();
            // });
        }
        ),
        catchError(this.authService.handleError<string>('postExperiment'))
      );
  }

  deleteExperiment(experimentId: string): Observable<String> {
    return this.http.delete(this.baseUrl + this.experimentInfoUrl + '/' + experimentId, this.httpOptions)
    .pipe(
      tap((result: String) => this.authService.log(`deleted Experiment w/ id=${experimentId}`, 'SUCCESS', false)),
      catchError(this.authService.handleError<String>('deleteExperiment'))
    );
  }

  changeExperimentStatus(changeStatusRequest: Object): Observable<String> {
    return this.http.put(this.baseUrl + this.experimentInfoUrl + '/' + changeStatusRequest['experimentId'] + '/status', changeStatusRequest, this.httpOptions)
    .pipe(
      tap((result: String) => this.authService.log(`changed status for Experiment w/ id=${changeStatusRequest['experimentId']}`, 'SUCCESS', false)),
      catchError(this.authService.handleError<String>('changeExperimentStatus'))
    )
  }

  executeExperimentAction(actionRequest: Object, action: string): Observable<String> {
    return this.http.post(this.baseUrl + this.experimentInfoUrl + '/' + actionRequest['experimentId'] + '/action/' + action, actionRequest, this.httpOptions)
    .pipe(
      tap((result: String) => this.authService.log(`executed action ${action} on Experiment w/ id=${actionRequest['experimentId']}`, 'SUCCESS', false)),
      catchError(this.authService.handleError<String>('executeExperimentAction'))
    )
  }
}
