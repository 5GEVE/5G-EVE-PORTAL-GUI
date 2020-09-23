import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { DescriptorsEStepperComponent } from './descriptors-e-stepper.component';

xdescribe('DescriptorsEStepperComponent', () => {
  let component: DescriptorsEStepperComponent;
  let fixture: ComponentFixture<DescriptorsEStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule,ReactiveFormsModule,HttpClientModule,MatSnackBarModule,RouterTestingModule],
      declarations: [ DescriptorsEStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptorsEStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
