import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule,MatDialogRef } from '@angular/material/dialog';

import { NfvVnfDialogComponent } from './nfv-vnf-dialog.component';

xdescribe('NfvVnfDialogComponent', () => {
  let component: NfvVnfDialogComponent;
  let fixture: ComponentFixture<NfvVnfDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [MatDialogModule,MatDialogRef],
      declarations: [ NfvVnfDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NfvVnfDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
