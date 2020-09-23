import { LayoutModule } from '@angular/cdk/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DashboardComponent } from './dashboard.component';
import {By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BlueprintsVsService } from '../blueprints-vs.service';
//import { AuthService } from '../auth.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let el : DebugElement;
  let spyBvsObj : any;
 // let myService: AuthService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatIconModule,
        MatMenuModule,
        RouterTestingModule,
        HttpClientModule,
        MatSnackBarModule
      ],
      /*
      providers: [
        {provide: myService, useClass: AuthService} // **--passing Mock service**
    ]
    */
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    //myService = TestBed.get(myService);
    spyBvsObj = jasmine.createSpyObj(BlueprintsVsService,['getVsBlueprints']);
    component.ngOnInit();
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
   
  it('it checks if getVsBlueprints is defined', () => {
    expect(spyBvsObj.getVsBlueprints).toBeDefined();
  });

  it('it checks if getVsBlueprints is called', () => {
    spyBvsObj.getVsBlueprints();
    expect(spyBvsObj.getVsBlueprints).toHaveBeenCalled();
  });

  it('it checks if getVsBlueprints is called once', () => {
    spyBvsObj.getVsBlueprints();
    expect(spyBvsObj.getVsBlueprints).toHaveBeenCalledTimes(1);
  });

  it('general check  : it should display 5 elements of dashboard', () => {
    let dashElem= el.queryAll(By.css(".dash-elem"));
    expect(dashElem).toBeTruthy("could not find element");
    expect(dashElem.length).toBe(5,"unexpected number of elements");

  });
});
