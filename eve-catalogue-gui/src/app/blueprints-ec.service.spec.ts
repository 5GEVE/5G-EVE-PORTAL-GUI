import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { BlueprintsEcService } from './blueprints-ec.service';

describe('BlueprintsEcService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      MatSnackBarModule,
      RouterTestingModule
    ]
  }));

  it('should be created', () => {
    const service: BlueprintsEcService = TestBed.get(BlueprintsEcService);
    expect(service).toBeTruthy();
  });
});
