import { TestBed } from '@angular/core/testing';

import { LanguageControllerService } from './language-controller.service';

describe('LanguageControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LanguageControllerService = TestBed.get(LanguageControllerService);
    expect(service).toBeTruthy();
  });
});
