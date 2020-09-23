import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { RestUtilsService } from './rest-utils.service';

describe('RestUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      MatSnackBarModule,
      HttpClientModule,
      RouterTestingModule]
    }));

  it('should be created', () => {
    const service: RestUtilsService = TestBed.get(RestUtilsService);
    expect(service).toBeTruthy();
  });
});
