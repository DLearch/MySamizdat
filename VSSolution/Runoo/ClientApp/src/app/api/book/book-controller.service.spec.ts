import { TestBed, inject } from '@angular/core/testing';

import { BookControllerService } from './book-controller.service';

describe('BookControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookControllerService]
    });
  });

  it('should be created', inject([BookControllerService], (service: BookControllerService) => {
    expect(service).toBeTruthy();
  }));
});
