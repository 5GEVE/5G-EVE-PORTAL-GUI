import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEventType, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, catchError, tap, last } from 'rxjs/operators';
import { environment } from '../../environments/environments';
import { FileUploadModel } from "../models/FileUpload"

@Injectable({ providedIn: 'root' })
export class FilesService {

    private baseUrl = environment.fsBaseUrl;

    constructor(private http: HttpClient) 
    { }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.log('files_service > ' + operation + ' failed: ' + error.status + ' - ' + error.statusText);
            if (error){
                return throwError([error.status, error.statusText]);
            }
            return of(result as T);
        };
    }
      
    private log(message: string) {
        console.log(message);
    }

    fetchSiteFacilities(){
      let userToken = localStorage.getItem('token')
      let header = {headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + userToken})};
      let url = this.baseUrl + 'site-facilities';
      return this.http.get(url, header)
          .pipe(
              tap((data: JSON) => {
                  return data;
              }),
              catchError(this.handleError<JSON>('getFiles'))
      );
    }

    fetchUploadedFiles(){
      let userToken = localStorage.getItem('token')
      let header = {headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + userToken})};
      let url = this.baseUrl;
      return this.http.get(url, header)
          .pipe(
              tap((data: JSON) => {
                  //this.log('files_service > Get Files done!');
                  return data;
              }),
              catchError(this.handleError<JSON>('getFiles'))
      );
    }

    upload(formData, filename: string) {
      let userToken = localStorage.getItem('token');
  
      return this.http.post<any>(this.baseUrl + 'upload/' + filename, formData, {  
          reportProgress: true,  
          observe: 'events',
          headers: new HttpHeaders({'Authorization': 'Bearer ' + userToken}) 
        });  
    }

    setSites(filename: string, sites: string[]){
      let userToken = localStorage.getItem('token');
      
      let data = {
        "sites": sites
      };
      
      return this.http.post<any>(this.baseUrl + 'sites/' + filename, data, {  
          reportProgress: true,  
          observe: 'events',
          headers: new HttpHeaders({'Authorization': 'Bearer ' + userToken}) 
        });      
    }

    setStatus(filename: string, site: string, status: string){

      let userToken = localStorage.getItem('token');

      let data = {
        "site": site,
        "status": status
      };
      
      return this.http.post<any>(this.baseUrl + 'status/' + filename, data, {  
          reportProgress: true,  
          observe: 'events',
          headers: new HttpHeaders({'Authorization': 'Bearer ' + userToken}) 
        });  

    }

    downloadFile(filename: string){
      let userToken = localStorage.getItem('token')

      let url = this.baseUrl + 'download/' + filename;

      return this.http.get(url, {  
        reportProgress: true,  
        observe: 'events',
        responseType: 'blob',
        headers: new HttpHeaders({'Authorization': 'Bearer ' + userToken}) 
      })
    }

    deleteFile(filename: string, site: string){
      let userToken = localStorage.getItem('token');

      let data = {
        "site": site,
      };
      
      return this.http.post<any>(this.baseUrl + 'delete/' + filename, data, {  
          reportProgress: true,  
          observe: 'events',
          headers: new HttpHeaders({'Authorization': 'Bearer ' + userToken}) 
        }); 
    }
}
