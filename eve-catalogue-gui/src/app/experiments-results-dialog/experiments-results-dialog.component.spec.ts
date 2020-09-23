import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule,MatDialogRef} from '@angular/material/dialog';

import { ExperimentsResultsDialogComponent } from './experiments-results-dialog.component';

xdescribe('ExperimentsResultsDialogComponent', () => {
  let component: ExperimentsResultsDialogComponent;
  let fixture: ComponentFixture<ExperimentsResultsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule,ReactiveFormsModule,MatDialogModule,MatDialogRef],
      declarations: [ ExperimentsResultsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentsResultsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
