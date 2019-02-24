import { TestBed } from '@angular/core/testing';

import { ChapterControllerService } from './chapter-controller.service';

describe('ChapterControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChapterControllerService = TestBed.get(ChapterControllerService);
    expect(service).toBeTruthy();
  });
});
