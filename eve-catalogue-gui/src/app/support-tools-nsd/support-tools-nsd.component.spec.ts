import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportToolsNsdComponent } from './support-tools-nsd.component';

describe('SupportToolsNsdComponent', () => {
  let component: SupportToolsNsdComponent;
  let fixture: ComponentFixture<SupportToolsNsdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportToolsNsdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportToolsNsdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
