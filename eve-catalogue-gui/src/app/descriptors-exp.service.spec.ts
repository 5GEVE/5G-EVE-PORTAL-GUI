import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { DescriptorsExpService } from './descriptors-exp.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('DescriptorsExpService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      MatSnackBarModule,
      RouterTestingModule
    ]}));

  it('should be created', () => {
    const service: DescriptorsExpService = TestBed.get(DescriptorsExpService);
    expect(service).toBeTruthy();
  });
});
