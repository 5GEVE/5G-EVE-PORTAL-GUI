import { MatSnackBarModule } from '@angular/material/snack-bar';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { BlueprintsVsService } from '../../blueprints-vs.service';
import { BlueprintsVsComponent } from './blueprints-vs.component';
import { observable, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('BlueprintsVsComponent', () => {
  let component: BlueprintsVsComponent;
  let fixture: ComponentFixture<BlueprintsVsComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueprintsVsComponent ],
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
    fixture = TestBed.createComponent(BlueprintsVsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
 /*
  it('fake test',()=> {
    jasmine.createSpy('getVsBlueprints').and.callThrough();
  })
  */
});
