import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule,MatDialogRef } from '@angular/material/dialog';

import { NfvVnfGraphDialogComponent } from './nfv-vnf-graph-dialog.component';

xdescribe('NfvVnfGraphDialogComponent', () => {
  let component: NfvVnfGraphDialogComponent;
  let fixture: ComponentFixture<NfvVnfGraphDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [MatDialogModule,MatDialogRef],
      declarations: [ NfvVnfGraphDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NfvVnfGraphDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
