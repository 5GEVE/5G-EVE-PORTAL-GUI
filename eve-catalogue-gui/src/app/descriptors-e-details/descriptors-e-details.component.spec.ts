import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { DescriptorsEDetailsComponent } from './descriptors-e-details.component';

xdescribe('DescriptorsEDetailsComponent', () => {
  let component: DescriptorsEDetailsComponent;
  let fixture: ComponentFixture<DescriptorsEDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,MatSnackBarModule,RouterTestingModule],
      declarations: [ DescriptorsEDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptorsEDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
