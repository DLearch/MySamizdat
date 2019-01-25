import { TestBed } from '@angular/core/testing';

import { EmailConfirmationService } from './email-confirmation.service';

describe('EmailConfirmationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmailConfirmationService = TestBed.get(EmailConfirmationService);
    expect(service).toBeTruthy();
  });
});
