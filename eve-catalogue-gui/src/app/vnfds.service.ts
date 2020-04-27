import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './environments/environments';
import { AuthService } from './auth.service';
import { VnfPkgInfo } from './nfv-vnf/vnf-pkg-info';
import { load } from 'js-yaml';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VnfdsService {

  private baseUrl = environment.iwlBaseUrl;
  private vnfdsInfoUrl = 'vnfpkgm/v1/vnf_packages';

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

  getVnfPackageInfos(): Observable<VnfPkgInfo[]> {
    return this.http.get<VnfPkgInfo[]>(this.baseUrl + this.vnfdsInfoUrl, this.httpOptions)
      .pipe(
        tap(_ => console.log('fetched vnfPackageInfos - SUCCESS')),
        catchError(this.authService.handleError<VnfPkgInfo[]>('getVnfPackageInfos', []))
      );
  }

  getVnfDescriptor(vnfPkgInfoId: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + this.vnfdsInfoUrl + "/" + vnfPkgInfoId + "/vnfd", this.vnfdHttpOptions)
      .pipe(
        map(vnfDescriptor => load(vnfDescriptor)),
        tap(_ => console.log('fetched vnfDescriptor - SUCCESS')),
        catchError(this.authService.handleError<any>('getVnfDescriptor'))
      );
  }

}
