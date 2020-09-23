import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ExperimentsMgmtDialogComponent } from './experiments-mgmt-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

xdescribe('ExperimentsMgmtDialogComponent', () => {
  let component: ExperimentsMgmtDialogComponent;
  let fixture: ComponentFixture<ExperimentsMgmtDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule,ReactiveFormsModule,MatDialogModule],
      declarations: [ ExperimentsMgmtDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentsMgmtDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
