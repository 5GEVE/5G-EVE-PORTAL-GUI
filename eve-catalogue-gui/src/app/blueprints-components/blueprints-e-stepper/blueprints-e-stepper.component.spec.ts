import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { BlueprintsEStepperComponent } from './blueprints-e-stepper.component';

xdescribe('BlueprintsEStepperComponent', () => {
  let component: BlueprintsEStepperComponent;
  let fixture: ComponentFixture<BlueprintsEStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatSnackBarModule,
        RouterTestingModule
      ],
      declarations: [ BlueprintsEStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueprintsEStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
