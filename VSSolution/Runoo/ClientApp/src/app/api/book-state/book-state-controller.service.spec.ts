import { TestBed, inject } from '@angular/core/testing';

import { BookStateControllerService } from './book-state-controller.service';

describe('BookStateControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookStateControllerService]
    });
  });

  it('should be created', inject([BookStateControllerService], (service: BookStateControllerService) => {
    expect(service).toBeTruthy();
  }));
});
