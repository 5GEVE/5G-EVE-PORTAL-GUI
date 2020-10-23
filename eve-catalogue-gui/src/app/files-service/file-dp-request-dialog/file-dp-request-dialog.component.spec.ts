import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDpRequestDialogComponent } from './file-dp-request-dialog.component';

describe('FileDpRequestDialogComponent', () => {
  let component: FileDpRequestDialogComponent;
  let fixture: ComponentFixture<FileDpRequestDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileDpRequestDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDpRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
