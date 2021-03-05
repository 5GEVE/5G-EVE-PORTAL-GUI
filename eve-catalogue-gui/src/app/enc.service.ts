import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './environments/environments';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EncService {
  private supBaseUrl = environment.supportBaseUrl;

  httpOptions = {
    headers: new HttpHeaders(
      { 'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      })
  };

  constructor(private http: HttpClient,
    private authService: AuthService) { }

    validateExpBlueprint(onBoardExpRequest: Object): Observable<String> {
        return this.http.post<any>(this.supBaseUrl + "exp/validate", onBoardExpRequest, this.httpOptions)
          .pipe(
            tap(_ => console.log('Experiment Blueprint validated')),
            catchError(this.authService.handleValidatorError<String>('validateExpBlueprint'))
          );
      }
      schemaExpBlueprint(): Observable<String> {
        return this.http.get<any>(this.supBaseUrl+"exp/schema", this.httpOptions)
          .pipe(
            tap(_ => console.log('fetched exp schema - SUCCESS')),
            catchError(this.authService.handleError<any>('schemaExpBlueprint'))
          );
      }

      validateTcBlueprint(onBoardTcRequest: Object): Observable<String> {
        return this.http.post<any>(this.supBaseUrl + "tcb/validate", onBoardTcRequest, this.httpOptions)
          .pipe(
            tap(_ => console.log("validatated tcb")),
            catchError(this.authService.handleValidatorError<String>('validateTcBlueprint'))
          );
      }
      schemaTcBlueprint(): Observable<String> {
        return this.http.get<any>(this.supBaseUrl+"tcb/schema", this.httpOptions)
          .pipe(
            tap(_ => console.log('fetched tc schema - SUCCESS')),
            catchError(this.authService.handleError<any>('schemaTcBlueprint'))
          );
      }

      validateVsBlueprint(onBoardVsRequest: Object) {
        return this.http.post<any>(this.supBaseUrl + "vsb/validate", onBoardVsRequest, this.httpOptions)
          .pipe(
            tap(_ => console.log("validated vsb")),
            catchError(this.authService.handleValidatorError<String>('validateVsBlueprint'))
          );

      }
      schemaVsBlueprint(): Observable<String> {
        return this.http.get<any>(this.supBaseUrl+ "vsb/schema", this.httpOptions)
          .pipe(
            tap(_ => console.log('fetched vsb schema - SUCCESS')),
            catchError(this.authService.handleError<any>('schemaVsBlueprint'))
          );
      }
      validateNsDescriptor(onBoardNsdRequest: Object){
        return this.http.post<any>(this.supBaseUrl + "vsb/validate", onBoardNsdRequest, this.httpOptions)
         .pipe(
           tap(_ => console.log("validated nsd")),
           catchError(this.authService.handleValidatorError<String>('validateNsDescriptor'))
         );

     }
     composeNsDescriptor(onBoardNsdRequest: Object): Observable<String> {
        return this.http.post<any>(this.supBaseUrl + "nsd/compose", onBoardNsdRequest, this.httpOptions)
          .pipe(
            tap((nsd: String) => console.log("compose Ns Descriptor")),
            catchError(this.authService.handleValidatorError<String>('composeNsDescriptor'))
          );
      }
      composeNsDescriptorDetails(onBoardNsdRequest: Object): Observable<any> {
        return this.http.post(this.supBaseUrl + "nsd/compose/details", onBoardNsdRequest, {responseType: 'arraybuffer'})
          .pipe(
            tap((res: any) => console.log("compose Ns Descriptor Details")),
            catchError(this.authService.handleValidatorError<any>('composeNsDescriptorDetails'))
          );
      }
      generateNsDescriptor(onBoardNsdRequest: Object): Observable<String> {
        return this.http.post<any>(this.supBaseUrl + "nsd/generate", onBoardNsdRequest, this.httpOptions)
          .pipe(
            tap((nsd: String) => console.log("generate Ns Descriptor")),
            catchError(this.authService.handleValidatorError<any>('generateNsDescriptor'))
          );
      }
     schemaNsDescriptor(): Observable<String> {
        return this.http.get<any>(this.supBaseUrl+"nsd/schema", this.httpOptions)
          .pipe(
            tap(_ => console.log('fetched nsd schema - SUCCESS')),
            catchError(this.authService.handleError<any>('schemaNsDescriptor'))
          );
      }

      validateCtxBlueprint(onboardCtxBlueprintRequest: Object) {
        return this.http.post<any>(this.supBaseUrl + "ctx/validate", onboardCtxBlueprintRequest, this.httpOptions)
         .pipe(
           tap((blueprintId: String) => console.log("validated ctx")),
           catchError(this.authService.handleValidatorError<String>('validateCtxBlueprint'))
         );

     }
     schemaCtxBlueprint(): Observable<String> {
       return this.http.get<any>(this.supBaseUrl+"ctx/schema", this.httpOptions)
         .pipe(
           tap(_ => console.log('fetched context blueprint schema - SUCCESS')),
           catchError(this.authService.handleError<any>('schemaCtxBlueprint'))
         );
     }
}
