import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BlueprintsExpService } from './blueprints-exp.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('BlueprintsExpService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      MatSnackBarModule,
      RouterTestingModule
    ]}));

  it('should be created', () => {
    const service: BlueprintsExpService = TestBed.get(BlueprintsExpService);
    expect(service).toBeTruthy();
  });
});
