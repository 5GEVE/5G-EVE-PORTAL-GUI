import { TestBed } from '@angular/core/testing';

import { MetricDashboardService } from './metric-dashboard.service';

describe('MetricDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MetricDashboardService = TestBed.get(MetricDashboardService);
    expect(service).toBeTruthy();
  });
});
