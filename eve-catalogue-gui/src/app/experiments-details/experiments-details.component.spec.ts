import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ExperimentsDetailsComponent } from './experiments-details.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';


describe('ExperimentsDetailsComponent', () => {
  let component: ExperimentsDetailsComponent;
  let fixture: ComponentFixture<ExperimentsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [MatSnackBarModule,RouterTestingModule],
      declarations: [ ExperimentsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientModule]});
    fixture = TestBed.createComponent(ExperimentsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
