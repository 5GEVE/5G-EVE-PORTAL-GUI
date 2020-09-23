import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { DescriptorsVsDetailsComponent } from './descriptors-vs-details.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

xdescribe('DescriptorsVsDetailsComponent', () => {
  let component: DescriptorsVsDetailsComponent;
  let fixture: ComponentFixture<DescriptorsVsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,MatSnackBarModule,RouterTestingModule],
      declarations: [ DescriptorsVsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptorsVsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
