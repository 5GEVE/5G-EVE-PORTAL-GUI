import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ExpDescriptorInfo } from './descriptors-e/exp-descriptor-info';
import { environment } from './environments/environments';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IWFRepository {

  private iwfUrl = environment.iwlBaseUrl;

  httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json',
        'Accept': 'application/json'
    })
  };
  constructor(private http: HttpClient,
              private authService: AuthService
    ) { }

  getCoverageAreaFilteredBySite(compatibleSite: string): Observable<any> {
    return this.http.get<any>(this.iwfUrl + "coverageAreas/search/findBySiteName?name=" + compatibleSite,this.httpOptions)
      .pipe(
        tap(_ => console.log('fetched coverage area info - SUCCESS')),
        catchError(this.handleError<any>('getCoverageArea'))
      );
  }


  getCoverageAreas(): Observable<any> {
    return this.http.get<any>(this.iwfUrl + "coverageAreas/", this.httpOptions)
      .pipe(
        tap(_ => console.log('fetched coverage area info - SUCCESS')),
        catchError(this.handleError<any>('getCoverageAreas'))
      );
  }


  handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
        if (error.status !== 200 ) {
          console.log(error.message + ' after ' + operation);
          this.authService.log(`${error.error.message} failed`, 'FAILED', false);
        }
      return of(result as T);
    };
  }
}
