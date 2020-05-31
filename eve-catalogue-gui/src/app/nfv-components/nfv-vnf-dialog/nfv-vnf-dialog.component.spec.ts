import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NfvVnfDialogComponent } from './nfv-vnf-dialog.component';

describe('NfvVnfDialogComponent', () => {
  let component: NfvVnfDialogComponent;
  let fixture: ComponentFixture<NfvVnfDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
