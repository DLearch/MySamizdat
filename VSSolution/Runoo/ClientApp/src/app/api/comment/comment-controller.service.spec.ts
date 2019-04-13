import { TestBed, inject } from '@angular/core/testing';

import { CommentControllerService } from './comment-controller.service';

describe('CommentControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentControllerService]
    });
  });

  it('should be created', inject([CommentControllerService], (service: CommentControllerService) => {
    expect(service).toBeTruthy();
  }));
});
