import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { DescriptorsTcComponent } from './descriptors-tc.component';

xdescribe('DescriptorsTcComponent', () => {
  let component: DescriptorsTcComponent;
  let fixture: ComponentFixture<DescriptorsTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,MatSnackBarModule,RouterTestingModule],
      declarations: [ DescriptorsTcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptorsTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
