import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TicketService } from './services/tickets.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-ticketing-system',
  templateUrl: './ticketing-system.component.html',
  styleUrls: ['./ticketing-system.component.css']
})

export class TicketingSystemComponent implements OnInit {

  @ViewChild('paginator', {static: false}) paginator: MatPaginator;

  refreshed: boolean = false;
  fetching: boolean = true;
  username: string = '';
  ticketingStatus: string = 'list';
  displayedColumns: string[] = ['id', 'product','component', 'status', 'summary', 'actions'];
  tickets = [];
  totalTickets = 0;
  numTickets = 0;
  currentPage = 0;
  products = [];
  components = [];
  users = [];
  addTicketForm: FormGroup;
  addTicketCommentForm: FormGroup;
  selectedTicket: JSON;
  selectedTicketComments: [];

  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private ticketService: TicketService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    if (localStorage.getItem('logged') != "true") {
      this.router.navigate(['/login']);
    }
    this.refreshed = false;
    this.username = localStorage.getItem('username');
    this.setTicketingStatus('list');
    this.getTickets(this.currentPage);
    this.addTicketForm = this.formBuilder.group({
      product: ['', Validators.required],
      component: ['', Validators.required],
      summary: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.addTicketCommentForm = this.formBuilder.group({
      commentDescription: ['', Validators.required],
    });
  }

  logout() {
    this.authenticationService.logout('/login').subscribe(tokenInfo => console.log(JSON.stringify(tokenInfo, null, 4)));
  }

  getTickets(page: number){
    this.fetching = true;
    this.ticketService.getTickets(page)
    .pipe()
    .subscribe(
        data => {
          this.tickets = data['details']['tickets'];
          this.totalTickets = data['details']['totalTickets'];
          this.numTickets = data['details']['numTickets'];
          
          this.refreshed = false;
          this.fetching = false;
        },
        error => {
            if ((error[0] == 401) && (!this.refreshed)) {
              this.refreshErrorHandler('getTickets');
            }
            else{
              console.log('[TicketComponent][getTickets] Error trying to retrieve bugs after refresh');
              this.router.navigate(['/login']);           
            }
      });
  }

  pageEvents(event: any) {
    console.log(event.pageIndex);
    this.getTickets(event.pageIndex);
    this.currentPage = event.pageIndex;
 }

  getTicketingStatus(){
    return this.ticketingStatus;
  }
  setTicketingStatus(status: string){
    this.ticketingStatus = status;
  }

  get fComments() {return this.addTicketCommentForm.controls}
  get f() { return this.addTicketForm.controls; }

  ticketDetails(ticket){
    this.ticketService.getTicketComments(ticket.id)
    .pipe()
    .subscribe(
      data => {
        this.selectedTicket = ticket;
        this.selectedTicketComments = data['details'];
        this.setTicketingStatus('details');
      },
      error => {
        if ((error[0] == 401) && (!this.refreshed)) {
          this.refreshErrorHandler('createTicket');
        }
        else{
          console.log('[TicketComponent][ticketDetails] Error retrieving bug ' + ticket.id + ' after refresh');
          this.refreshed = false;
          this.router.navigate(['/login']);
        }
      });
  }

  goTo(route: string){
    switch (route){
      case 'list':
        this.setTicketingStatus('list');
        this.addTicketForm.reset();
        break;
      case 'add':
        this.getProducts();
        this.getAdminUsers();             
        this.setTicketingStatus('add');
        break;
    }
      
  }

  onSubmit() {
    if (this.addTicketForm.invalid) {
      //console.log("Invalid Form")
      return;
    }
    this.ticketService.createTicket(this.f.product.value, this.f.component.value, this.f.summary.value, this.f.description.value)
      .pipe()
      .subscribe(
          data => {
            console.log("getting data from create ticket")
            this.ngOnInit();
          },
          error => {
            if ((error[0] == 401) && (!this.refreshed)) {
              console.log("error from create ticket")
              this.refreshErrorHandler('createTicket');
            }
            else{
              console.log('[TicketComponent][onSubmit] Error retrieving bugs after refresh');
              this.refreshed = false;
              this.router.navigate(['/login']);
            }
          });
  }

  createComment(){
    if (this.addTicketCommentForm.invalid) {
      console.log("Invalid Form - comments")
      return;
    }
    this.ticketService.createTicketComment(this.selectedTicket['id'], this.fComments.commentDescription.value)
      .pipe()
      .subscribe(
          data => {
            console.log(data);
            this.ticketDetails(this.selectedTicket);
          },
          error => {
            if ((error[0] == 401) && (!this.refreshed)) {
              this.refreshErrorHandler('createTicketComment');
            }
            else{
              console.log('[TicketComponent][createComment] Error creating bug comment after refresh');
              this.refreshed = false;
              this.router.navigate(['/login']);
            }
          }); 
  }

  getProducts(){
    this.fetching = true;
    this.ticketService.getProducts()
    .pipe()
    .subscribe(
        data => {
          //console.log(data['details']);
          this.products = data['details'];
          this.refreshed = false;
          this.fetching = false;
          //console.log(this.products)
        },
        error => {
            if ((error[0] == 401) && (!this.refreshed)) {
              this.refreshErrorHandler('getProducts');
            }
            else{
              console.log('[TicketComponent][getProducts] Error retrieving bugs after refresh');
              this.router.navigate(['/login']);              
            }
      });
  }

  getComponents(){
    let productId = this.f.product.value
    this.ticketService.getComponents(productId)
    .pipe()
    .subscribe(
        data => {
          console.log(data['details']);
          this.components = data['details'];
          this.refreshed = false;
        },
        error => {
          if (error[0] == 401){
              this.refreshErrorHandler('getComponents');
            }
          else{
            console.log('[TicketComponent][getComponents] Error retrieving bugs after refresh');
            this.router.navigate(['/login']);              
          }
      });
  }

  getAdminUsers(){
    this.ticketService.getAdminUsers()
    .pipe()
    .subscribe(
        data => {
          console.log(data['details']);
          this.users = data['details']['users'];
          this.refreshed = false;
        },
        error => {
          if ((error[0] == 401) && (!this.refreshed)) {
            this.refreshErrorHandler('getAdminUsers');
          }
          else{
            console.log('[TicketComponent][getAdminUsers] Error retrieving bugs for the second time (getAdminUsers)');
            //this.authenticationService.clearCurrentUser();
            this.router.navigate(['/login']);              
          }

      });
  }

  refreshErrorHandler(funcName: string){
    this.authenticationService.refresh({
      access_token: localStorage.getItem('token'),
      refresh_token: localStorage.getItem('refreshtoken')
    })
    .pipe()
      .subscribe(
        data => {
          this.refreshed = true;
          switch (funcName){
            case 'createTicket':
              this.onSubmit();
              break;
            case 'getTickets':
              this.getTickets(this.currentPage);  
              break;
            case 'createTicketComment':
              this.createComment();
              break;
            case 'getProducts':
              this.getProducts();  
              break;
            case 'getAdminUsers':
              this.getAdminUsers();   
              break;
              case 'getComponents':
                this.getComponents();   
                break;              
          }
        },
        error => {
          console.log('TicketComponent > error refreshing token ' + funcName);
          this.refreshed = false;
          this.router.navigate(['/login']);                    
        }
      )    
  }

}
