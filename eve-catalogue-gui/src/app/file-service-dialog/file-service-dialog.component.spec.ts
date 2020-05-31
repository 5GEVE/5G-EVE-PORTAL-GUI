import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileServiceDialogComponent } from './file-service-dialog.component';

describe('FileServiceDialogComponent', () => {
  let component: FileServiceDialogComponent;
  let fixture: ComponentFixture<FileServiceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileServiceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileServiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
