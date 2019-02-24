import { TestBed } from '@angular/core/testing';

import { BookControllerService } from './book-controller.service';

describe('BookControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookControllerService = TestBed.get(BookControllerService);
    expect(service).toBeTruthy();
  });
});
