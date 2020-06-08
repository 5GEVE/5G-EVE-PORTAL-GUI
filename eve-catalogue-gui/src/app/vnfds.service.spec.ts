import { TestBed } from '@angular/core/testing';

import { VnfdsService } from './vnfds.service';

describe('VnfdsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VnfdsService = TestBed.get(VnfdsService);
    expect(service).toBeTruthy();
  });
});
