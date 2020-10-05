import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportToolsComposerComponent } from './support-tools-composer.component';

describe('SupportToolsComposerComponent', () => {
  let component: SupportToolsComposerComponent;
  let fixture: ComponentFixture<SupportToolsComposerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportToolsComposerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportToolsComposerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
