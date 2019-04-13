import { TestBed, inject } from '@angular/core/testing';

import { ChapterStateControllerService } from './chapter-state-controller.service';

describe('ChapterStateControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChapterStateControllerService]
    });
  });

  it('should be created', inject([ChapterStateControllerService], (service: ChapterStateControllerService) => {
    expect(service).toBeTruthy();
  }));
});
