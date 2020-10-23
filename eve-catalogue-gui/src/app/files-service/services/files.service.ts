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
                  return data;
              }),
              catchError(this.handleError<JSON>('getFiles'))
      );
    }

    fetchDeploymentRequests(){
      let userToken = localStorage.getItem('token')
      let header = {headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + userToken})};
      let url = this.baseUrl + 'dp_requests';
      return this.http.get(url, header)
          .pipe(
              tap((data: JSON) => {
                  return data;
              }),
              catchError(this.handleError<JSON>('getFiles'))
      );
    }

    check_file(filename: string){
      let userToken = localStorage.getItem('token');
  
      return this.http.get<any>(this.baseUrl + filename, {  
          reportProgress: true,  
          observe: 'events',
          headers: new HttpHeaders({'Authorization': 'Bearer ' + userToken}) 
        });       
    }

    upload(formData, filename: string) {
      let userToken = localStorage.getItem('token');
  
      return this.http.post<any>(this.baseUrl + filename, formData, {  
          reportProgress: true,  
          observe: 'events',
          headers: new HttpHeaders({'Authorization': 'Bearer ' + userToken}) 
        });  
    }

    setSites(filename: string, sites: string[]){
      let userToken = localStorage.getItem('token');
      
      let data = {
        "filename": filename,
        "sites": sites
      };
      
      return this.http.post<any>(this.baseUrl + 'dp_requests', data, {  
          reportProgress: true,  
          observe: 'events',
          headers: new HttpHeaders({'Authorization': 'Bearer ' + userToken}) 
        });      
    }

    setStatus(requestId: string, status: string){

      let userToken = localStorage.getItem('token');

      let data = {
        "status": status
      };
      
      return this.http.put<any>(this.baseUrl + 'dp_requests/' + requestId, data, {  
          reportProgress: true,
          headers: new HttpHeaders({'Authorization': 'Bearer ' + userToken}) 
        });  

    }

    downloadFile(filename: string){
      let userToken = localStorage.getItem('token')

      let url = this.baseUrl  + filename + '/download';

      return this.http.get(url, {  
        reportProgress: true,  
        observe: 'events',
        responseType: 'blob',
        headers: new HttpHeaders({'Authorization': 'Bearer ' + userToken}) 
      })
    }

    downloadAssociatedFile(request_id: string){
      let userToken = localStorage.getItem('token')

      let url = this.baseUrl  + 'dp_requests/' + request_id + '/download';

      return this.http.get(url, {  
        reportProgress: true,  
        observe: 'events',
        responseType: 'blob',
        headers: new HttpHeaders({'Authorization': 'Bearer ' + userToken}) 
      })
    }

    deleteFile(filename: string){
      let userToken = localStorage.getItem('token');
      
      return this.http.delete(this.baseUrl + filename, {
          headers: new HttpHeaders({'Authorization': 'Bearer ' + userToken}) 
        }); 
    }

    deleteRequest(requestId: string){
      let userToken = localStorage.getItem('token');
      
      return this.http.delete(this.baseUrl + 'dp_requests/' + requestId, {
          headers: new HttpHeaders({'Authorization': 'Bearer ' + userToken}) 
        }); 
    }    
}
