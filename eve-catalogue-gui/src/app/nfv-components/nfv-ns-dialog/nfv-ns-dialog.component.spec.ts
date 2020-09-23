import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NfvNsDialogComponent } from './nfv-ns-dialog.component';

import { MatDialogRef } from '@angular/material/dialog';

xdescribe('NfvNsDialogComponent', () => {
  let component: NfvNsDialogComponent;
  let fixture: ComponentFixture<NfvNsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [MatDialogRef,BrowserAnimationsModule],
      declarations: [ NfvNsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NfvNsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
