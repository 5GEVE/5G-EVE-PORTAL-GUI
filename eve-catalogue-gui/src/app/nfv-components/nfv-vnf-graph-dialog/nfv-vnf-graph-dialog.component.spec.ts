import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NfvVnfGraphDialogComponent } from './nfv-vnf-graph-dialog.component';

describe('NfvVnfGraphDialogComponent', () => {
  let component: NfvVnfGraphDialogComponent;
  let fixture: ComponentFixture<NfvVnfGraphDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
