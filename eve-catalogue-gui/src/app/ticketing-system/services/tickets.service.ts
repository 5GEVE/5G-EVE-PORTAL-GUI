import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environments';

@Injectable({ providedIn: 'root' })
export class TicketService {

    private baseUrl = environment.tsbBaseUrl;

    constructor(private http: HttpClient) 
    { }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.log('auth_service > ' + operation + ' failed: ' + error.status + ' - ' + error.statusText);
            if (error){
                return throwError([error.status, error.statusText]);
            }
            return of(result as T);
        };
    }
      
    private log(message: string) {
        console.log(message);
    }

    /* Tickets management */
    getTickets(page: number) {
        let userToken = localStorage.getItem('token')
        let header = {headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + userToken})};
        let url = this.baseUrl + 'tickets' + '?page=' + page;
        return this.http.get(url, header)
            .pipe(
                tap((data: JSON) => {
                    //this.log('tickets_service > getTickets done!');
                    return data;
                }),
                catchError(this.handleError<JSON>('getTickets'))
        );
    }

    getTicket(id: string){
        let userToken = localStorage.getItem('token')
        let header = {headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + userToken})};
        return this.http.get(this.baseUrl + 'tickets/' + id , header)
            .pipe(
                tap((data: JSON) => {
                    //this.log('tickets_service > getTicket with id ' + id + 'done!');
                    return data;
                }),
                catchError(this.handleError<JSON>('getTickets'))
        ); 
    }

    createTicket(productName: string, componentName: string, summary: string, description: string){
        let userToken = localStorage.getItem('token')
        /*let data = {
            "product": productName, "component": componentName, 
            "summary": summary, "description": description,
            "assigned_to": assigned_to
        };*/
        let data = {
            "product": productName, "component": componentName, 
            "summary": summary, "description": description
        };
        let header = {headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + userToken})};
        return this.http.post(this.baseUrl + 'tickets', data, header)
            .pipe(
                tap((data: JSON) => {
                    this.log('auth_service > Ticket ' + summary + ' correctly created');
                    return data;
                }),
                catchError(this.handleError<JSON>('createTicket'))
        );        
    }

    getTicketComments(ticketId: string){
        let userToken = localStorage.getItem('token')
        let header = {headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + userToken})};
        return this.http.get(this.baseUrl + 'tickets/' + ticketId + '/comments', header)
            .pipe(
                tap((data: JSON) => {
                    //this.log('tickets_service > comments of ticket ' + ticketId + ' correctly fetched');
                    return data;
                }),
                catchError(this.handleError<JSON>('getTickets'))
        ); 
    }

    createTicketComment(ticketId: string, comment: string){
        let userToken = localStorage.getItem('token')
        let data = {
            "comment": comment
        };
        let header = {headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + userToken})};
        return this.http.post(this.baseUrl + 'tickets/' + ticketId + '/comments', data, header)
            .pipe(
                tap((data: JSON) => {
                    //this.log('auth_service > Comment for ticket ' + ticketId + ' correctly created');
                    return data;
                }),
                catchError(this.handleError<JSON>('createTicket'))
        ); 
    }

    /* Products and components management 
     *  - In our schema, there is only one product and a fixed number of components
     *  - tickets will be pointing to specific components inside the main product
     */
    getProducts(){
        let userToken = localStorage.getItem('token')
        let header = {headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + userToken})};
        return this.http.get(this.baseUrl + 'products', header)
            .pipe(
                tap((data: JSON) => {
                    //this.log('tickets_service > getProducts done!');
                    return data;
                }),
                catchError(this.handleError<JSON>('getProducts'))
        );
    }

    getComponents(productId: String){
        let userToken = localStorage.getItem('token')
        let header = {headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + userToken})};
        return this.http.get(this.baseUrl + 'components' + '?product_id=' + productId, header)
            .pipe(
                tap((data: JSON) => {
                    //this.log('tickets_service > getComponents done!');
                    return data;
                }),
                catchError(this.handleError<JSON>('getComponents'))
        );
    }

    getAdminUsers(){
        let userToken = localStorage.getItem('token')
        let header = {headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + userToken})};
        return this.http.get(this.baseUrl + 'adminusers', header)
            .pipe(
                tap((data: JSON) => {
                    //this.log('auth_service > getAdminUsers done!');
                    return data;
                }),
                catchError(this.handleError<JSON>('getAdminUsers'))
        );        
    }

}
