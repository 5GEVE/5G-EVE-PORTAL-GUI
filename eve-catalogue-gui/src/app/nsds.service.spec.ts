import { TestBed } from '@angular/core/testing';

import { NsdsService } from './nsds.service';

describe('NsdsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NsdsService = TestBed.get(NsdsService);
    expect(service).toBeTruthy();
  });
});
