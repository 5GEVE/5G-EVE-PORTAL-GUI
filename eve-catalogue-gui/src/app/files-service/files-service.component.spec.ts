import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesServiceComponent } from './files-service.component';

describe('FilesServiceComponent', () => {
  let component: FilesServiceComponent;
  let fixture: ComponentFixture<FilesServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
