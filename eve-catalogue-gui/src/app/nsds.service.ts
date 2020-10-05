import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './environments/environments';
import { AuthService } from './auth.service';
import { NsdInfo } from './nfv-components/nfv-ns/nsd-info';
import { load } from 'js-yaml';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NsdsService {

  private baseUrl = environment.iwlBaseUrl;
  private nsdsInfoUrl = 'nsd/v1/ns_descriptors';
  private supBaseUrl = environment.supportBaseUrl;

  httpOptions = {
    headers: new HttpHeaders(
      { 'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      })
  };

  vnfdHttpOptions = {
    headers: new HttpHeaders(
      { 
        'Accept': 'application/yaml',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }),
    responseType: 'text' as 'json'
  };

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  getNsdInfos(): Observable<NsdInfo[]> {
    return this.http.get<NsdInfo[]>(this.baseUrl + this.nsdsInfoUrl, this.httpOptions)
      .pipe(
        tap(_ => console.log('fetched nsdInfos - SUCCESS')),
        catchError(this.authService.handleError<NsdInfo[]>('getNsdInfos', []))
      );
  }

  getNsDescriptor(nsdInfoId: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + this.nsdsInfoUrl + "/" + nsdInfoId + "/nsd_content", this.vnfdHttpOptions)
      .pipe(
        map(nsDescriptor => load(nsDescriptor)),
        tap(_ => console.log('fetched nsDescriptor - SUCCESS')),
        catchError(this.authService.handleError<any>('getNsDescriptor'))
      );
  }
  generateNsDescriptor(onBoardNsdRequest: Object): Observable<String> {
    return this.http.post(this.supBaseUrl + "nsd/generate", onBoardNsdRequest, this.httpOptions)
      .pipe(
        tap((nsd: String) => console.log("generate Ns Descriptor")),
        catchError(this.authService.handleValidatorError<any>('generateNsDescriptor'))
      );
  }
  validateNsDescriptor(onBoardNsdRequest: Object): Observable<String> {
    return this.http.post(this.supBaseUrl + "nsd/validate", onBoardNsdRequest, this.httpOptions)
      .pipe(
        tap((nsd: String) => console.log("validate nsd")),
        catchError(this.authService.handleValidatorError<String>('validateNsDescriptor'))
      );
  }
  composeNsDescriptor(onBoardNsdRequest: Object): Observable<String> {
    return this.http.post(this.supBaseUrl + "nsd/compose", onBoardNsdRequest, this.httpOptions)
      .pipe(
        tap((nsd: String) => console.log("compose Ns Descriptor")),
        catchError(this.authService.handleValidatorError<String>('composeNsDescriptor'))
      );
  }
  schemaNsDescriptor(): Observable<String> {
    return this.http.get<any>(this.supBaseUrl+"nsd/schema", this.httpOptions)
      .pipe(
        tap(_ => console.log('fetched nsd schema - SUCCESS')),
        catchError(this.authService.handleError<any>('schemaNsDescriptor'))
      );
  }
}
