import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule,MatDialogRef } from '@angular/material/dialog';
import { ExperimentsExecuteDialogComponent } from './experiments-execute-dialog.component';

xdescribe('ExperimentsExecuteDialogComponent', () => {
  let component: ExperimentsExecuteDialogComponent;
  let fixture: ComponentFixture<ExperimentsExecuteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule,ReactiveFormsModule,MatDialogModule,MatDialogRef,BrowserAnimationsModule],
      declarations: [ ExperimentsExecuteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentsExecuteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
