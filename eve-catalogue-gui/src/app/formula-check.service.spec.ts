import { TestBed } from '@angular/core/testing';

import { FormulaCheckService } from './formula-check.service';

describe('FormulaCheckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormulaCheckService = TestBed.get(FormulaCheckService);
    expect(service).toBeTruthy();
  });
});
