import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { TicketingSystemComponent } from './ticketing-system.component';

describe('TicketingSystemComponent', () => {
  let component: TicketingSystemComponent;
  let fixture: ComponentFixture<TicketingSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        HttpClientModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule],
      declarations: [ TicketingSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketingSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
