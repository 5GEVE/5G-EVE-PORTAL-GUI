import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { VsbDetailsService } from './vsb-details.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('VsbDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      HttpClientModule,
      MatSnackBarModule
    ]
  }));

  it('should be created', () => {
    const service: VsbDetailsService = TestBed.get(VsbDetailsService);
    expect(service).toBeTruthy();
  });
});
