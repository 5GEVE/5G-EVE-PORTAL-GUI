import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesServiceSecondComponent } from './files-service-second.component';

describe('FilesServiceSecondComponent', () => {
  let component: FilesServiceSecondComponent;
  let fixture: ComponentFixture<FilesServiceSecondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesServiceSecondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesServiceSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
