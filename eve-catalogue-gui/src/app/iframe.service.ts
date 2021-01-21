import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './environments/environments';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IFrameService {


  httpOptionsWithAccept:Object = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }), responseType: 'blob'
  };

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  getBlobContent(url: string): Observable<any> {
    return this.http.get<any>(url, this.httpOptionsWithAccept)
      .pipe(
        tap( data => console.log('iFrame data received')),
        catchError(this.authService.handleError<any>('Dashboard')),
      );
  }
}
