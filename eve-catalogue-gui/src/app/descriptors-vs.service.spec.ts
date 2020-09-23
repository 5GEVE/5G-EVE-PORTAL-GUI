import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { DescriptorsVsService } from './descriptors-vs.service';

describe('DescriptorsVsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      MatSnackBarModule,
      RouterTestingModule
    ]
  }));

  it('should be created', () => {
    const service: DescriptorsVsService = TestBed.get(DescriptorsVsService);
    expect(service).toBeTruthy();
  });
});
