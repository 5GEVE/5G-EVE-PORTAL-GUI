import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportToolsValidationComponent } from './support-tools-validation.component';

describe('SupportToolsValidationComponent', () => {
  let component: SupportToolsValidationComponent;
  let fixture: ComponentFixture<SupportToolsValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportToolsValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportToolsValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
