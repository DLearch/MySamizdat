import { TestBed } from '@angular/core/testing';

import { NewBookService } from './new-book.service';

describe('NewBookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewBookService = TestBed.get(NewBookService);
    expect(service).toBeTruthy();
  });
});
