import { TestBed, inject } from '@angular/core/testing';

import { ChapterControllerService } from './chapter-controller.service';

describe('ChapterControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChapterControllerService]
    });
  });

  it('should be created', inject([ChapterControllerService], (service: ChapterControllerService) => {
    expect(service).toBeTruthy();
  }));
});
