import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { DescriptorsESchedulerComponent } from './descriptors-e-scheduler.component';

xdescribe('DescriptorsESchedulerComponent', () => {
  let component: DescriptorsESchedulerComponent;
  let fixture: ComponentFixture<DescriptorsESchedulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        MatSnackBarModule
      ],
      declarations: [ DescriptorsESchedulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptorsESchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
