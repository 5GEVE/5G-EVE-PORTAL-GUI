import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ExperimentSubToolbarComponent } from './experiment-sub-toolbar.component';

describe('ExperimentSubToolbarComponent', () => {
  let component: ExperimentSubToolbarComponent;
  let fixture: ComponentFixture<ExperimentSubToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientModule,MatSnackBarModule],
      declarations: [ ExperimentSubToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentSubToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
