import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { NsdsService } from './nsds.service';

describe('NsdsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule,MatSnackBarModule,RouterTestingModule]
  }));

  it('should be created', () => {
    const service: NsdsService = TestBed.get(NsdsService);
    expect(service).toBeTruthy();
  });
});
