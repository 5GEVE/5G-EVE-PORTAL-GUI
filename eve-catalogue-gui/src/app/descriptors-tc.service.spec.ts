import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { DescriptorsTcService } from './descriptors-tc.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

describe('DescriptorsTcService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      MatSnackBarModule,
      RouterTestingModule
    ]}));

  it('should be created', () => {
    const service: DescriptorsTcService = TestBed.get(DescriptorsTcService);
    expect(service).toBeTruthy();
  });
});
