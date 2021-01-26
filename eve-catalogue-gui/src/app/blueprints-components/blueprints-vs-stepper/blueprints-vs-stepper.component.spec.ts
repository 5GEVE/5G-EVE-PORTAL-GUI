import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { BlueprintsVsStepperComponent } from './blueprints-vs-stepper.component';

xdescribe('BlueprintsVsStepperComponent', () => {
  let component: BlueprintsVsStepperComponent;
  let fixture: ComponentFixture<BlueprintsVsStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule,ReactiveFormsModule,HttpClientModule,MatSnackBarModule,RouterTestingModule],
      declarations: [ BlueprintsVsStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueprintsVsStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
