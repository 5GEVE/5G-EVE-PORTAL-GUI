import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NfvNsDialogComponent } from './nfv-ns-dialog.component';

describe('NfvNsDialogComponent', () => {
  let component: NfvNsDialogComponent;
  let fixture: ComponentFixture<NfvNsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
