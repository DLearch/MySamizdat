import { TestBed, inject } from '@angular/core/testing';

import { AuthControllerService } from './auth-controller.service';

describe('AuthControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthControllerService]
    });
  });

  it('should be created', inject([AuthControllerService], (service: AuthControllerService) => {
    expect(service).toBeTruthy();
  }));
});
