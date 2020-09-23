import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { DescriptorsEcService } from './descriptors-ec.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

describe('DescriptorsEcService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [
    HttpClientModule,
    MatSnackBarModule,
    RouterTestingModule]}));

  it('should be created', () => {
    const service: DescriptorsEcService = TestBed.get(DescriptorsEcService);
    expect(service).toBeTruthy();
  });
});
