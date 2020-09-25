import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportToolsSchemasComponent } from './support-tools-schemas.component';

describe('SupportToolsSchemasComponent', () => {
  let component: SupportToolsSchemasComponent;
  let fixture: ComponentFixture<SupportToolsSchemasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportToolsSchemasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportToolsSchemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
