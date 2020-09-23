import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { DescriptorsEComponent } from './descriptors-e.component';

xdescribe('DescriptorsEComponent', () => {
  let component: DescriptorsEComponent;
  let fixture: ComponentFixture<DescriptorsEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptorsEComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        HttpClientModule,
        MatSnackBarModule,
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptorsEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
  
  it('it should call one time', () => {
    let spyObj=jasmine.createSpyObj(DescriptorsEComponent,['getExpDescriptors'])
    expect(spyObj.getExpDescriptors).toHaveBeenCalledTimes(1);
  });
  
});
