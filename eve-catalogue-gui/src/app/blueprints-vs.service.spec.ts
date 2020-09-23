import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule ,HttpTestingController} from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule} from '@angular/common/http';
import { BlueprintsVsService } from './blueprints-vs.service';

describe('BlueprintsVsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpClientTestingModule,
      HttpTestingController
    ],
  imports:[HttpClientModule,MatSnackBarModule,RouterTestingModule]}));

  it('should be created', () => {
    const service: BlueprintsVsService = TestBed.get(BlueprintsVsService);
    expect(service).toBeTruthy();
  });

  it('testing mock http', () => {
    const serviceController: HttpTestingController = TestBed.get(HttpTestingController);
    expect(serviceController).toBeTruthy();
  });
});
