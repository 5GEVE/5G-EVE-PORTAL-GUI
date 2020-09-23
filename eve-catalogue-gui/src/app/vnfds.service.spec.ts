import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { VnfdsService } from './vnfds.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('VnfdsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule,MatSnackBarModule,RouterTestingModule,BrowserAnimationsModule]
  }));

  it('should be created', () => {
    const service: VnfdsService = TestBed.get(VnfdsService);
    expect(service).toBeTruthy();
  });
});
