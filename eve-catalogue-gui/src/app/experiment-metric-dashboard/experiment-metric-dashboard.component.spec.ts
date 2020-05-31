import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentMetricDashboardComponent } from './experiment-metric-dashboard.component';

describe('ExperimentMetricDashboardComponent', () => {
  let component: ExperimentMetricDashboardComponent;
  let fixture: ComponentFixture<ExperimentMetricDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentMetricDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentMetricDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
