import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NfvNsGraphDialogComponent } from './nfv-ns-graph-dialog.component';

describe('NfvNsGraphDialogComponent', () => {
  let component: NfvNsGraphDialogComponent;
  let fixture: ComponentFixture<NfvNsGraphDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
