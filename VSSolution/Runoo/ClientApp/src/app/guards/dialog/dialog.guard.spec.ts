import { TestBed, async, inject } from '@angular/core/testing';

import { DialogGuard } from './dialog.guard';

describe('DialogGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogGuard]
    });
  });

  it('should ...', inject([DialogGuard], (guard: DialogGuard) => {
    expect(guard).toBeTruthy();
  }));
});
