import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './environments/environments';
import { FormulaCheckInfo } from './formula-check-info';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FormulaCheckService {

  private baseUrl = environment.formulaCheckUrl;

  httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json'
      })
  };

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  validateFormula(formulaCheck: string): Observable<FormulaCheckInfo> {
    return this.http.post<FormulaCheckInfo>(this.baseUrl, formulaCheck, this.httpOptions)
      .pipe(
        tap(_ => console.log(' formula Validated- SUCCESS')),
        catchError(this.authService.handleError<FormulaCheckInfo>('validateFormula'))
      );
  }

}
