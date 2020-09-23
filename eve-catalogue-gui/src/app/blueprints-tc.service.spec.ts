import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BlueprintsTcService } from './blueprints-tc.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

describe('BlueprintsTcService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule,MatSnackBarModule,RouterTestingModule]}));

  it('should be created', () => {
    const service: BlueprintsTcService = TestBed.get(BlueprintsTcService);
    expect(service).toBeTruthy();
  });
});
