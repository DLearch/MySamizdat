import { TestBed } from '@angular/core/testing';

import { NewCommentService } from './new-comment.service';

describe('NewCommentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewCommentService = TestBed.get(NewCommentService);
    expect(service).toBeTruthy();
  });
});
