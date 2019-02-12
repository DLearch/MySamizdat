import { TestBed } from '@angular/core/testing';

import { DialogWindowService } from './dialog-window.service';

describe('DialogWindowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DialogWindowService = TestBed.get(DialogWindowService);
    expect(service).toBeTruthy();
  });
});
