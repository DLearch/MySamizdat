import { TestBed, inject } from '@angular/core/testing';

import { LanguageControllerService } from './language-controller.service';

describe('LanguageControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LanguageControllerService]
    });
  });

  it('should be created', inject([LanguageControllerService], (service: LanguageControllerService) => {
    expect(service).toBeTruthy();
  }));
});
