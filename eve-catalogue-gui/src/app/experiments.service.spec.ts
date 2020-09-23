import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ExperimentsService } from './experiments.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

describe('ExperimentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      MatSnackBarModule,
      RouterTestingModule
    ]}));

  it('should be created', () => {
    const service: ExperimentsService = TestBed.get(ExperimentsService);
    expect(service).toBeTruthy();
  });
});
