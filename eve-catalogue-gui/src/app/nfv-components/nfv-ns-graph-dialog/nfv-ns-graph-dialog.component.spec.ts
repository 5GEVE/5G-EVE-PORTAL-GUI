import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule,MatDialogRef } from '@angular/material/dialog';

import { NfvNsGraphDialogComponent } from './nfv-ns-graph-dialog.component';

xdescribe('NfvNsGraphDialogComponent', () => {
  let component: NfvNsGraphDialogComponent;
  let fixture: ComponentFixture<NfvNsGraphDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [MatDialogModule,MatDialogRef],
      declarations: [ NfvNsGraphDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NfvNsGraphDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
