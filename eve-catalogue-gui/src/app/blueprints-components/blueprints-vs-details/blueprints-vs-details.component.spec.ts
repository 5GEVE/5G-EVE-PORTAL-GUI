import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { BlueprintsVsDetailsComponent } from './blueprints-vs-details.component';
import { HttpClientModule } from '@angular/common/http';

describe('VsbGraphComponent', () => {
  let component: BlueprintsVsDetailsComponent;
  let fixture: ComponentFixture<BlueprintsVsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientModule,MatSnackBarModule,RouterTestingModule],
      declarations: [ BlueprintsVsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueprintsVsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
