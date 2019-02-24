import { TestBed } from '@angular/core/testing';

import { NewChapterService } from './new-chapter.service';

describe('NewChapterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewChapterService = TestBed.get(NewChapterService);
    expect(service).toBeTruthy();
  });
});
