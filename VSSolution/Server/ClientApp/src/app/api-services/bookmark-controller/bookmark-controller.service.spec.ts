import { TestBed } from '@angular/core/testing';

import { BookmarkControllerService } from './bookmark-controller.service';

describe('BookmarkControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookmarkControllerService = TestBed.get(BookmarkControllerService);
    expect(service).toBeTruthy();
  });
});
