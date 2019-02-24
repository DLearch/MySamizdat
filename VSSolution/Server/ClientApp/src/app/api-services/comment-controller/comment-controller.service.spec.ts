import { TestBed } from '@angular/core/testing';

import { CommentControllerService } from './comment-controller.service';

describe('CommentControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommentControllerService = TestBed.get(CommentControllerService);
    expect(service).toBeTruthy();
  });
});
