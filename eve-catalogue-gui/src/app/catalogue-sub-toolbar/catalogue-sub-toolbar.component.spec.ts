import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { RouterTestingModule } from '@angular/router/testing';
import { CatalogueSubToolbarComponent } from './catalogue-sub-toolbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';


xdescribe('CatalogueSubToolbarComponent', () => {
  let component: CatalogueSubToolbarComponent;
  let fixture: ComponentFixture<CatalogueSubToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientModule,MatSnackBarModule,MatMenuModule],
      declarations: [ CatalogueSubToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogueSubToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
