import { TestBed } from '@angular/core/testing';

import { BreakPointService } from './break-point.service';

describe('BreakPointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BreakPointService = TestBed.get(BreakPointService);
    expect(service).toBeTruthy();
  });
});
