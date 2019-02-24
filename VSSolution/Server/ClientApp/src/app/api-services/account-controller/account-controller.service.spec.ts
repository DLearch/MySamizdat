import { TestBed } from '@angular/core/testing';

import { AccountControllerService } from './account-controller.service';

describe('AccountControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountControllerService = TestBed.get(AccountControllerService);
    expect(service).toBeTruthy();
  });
});
