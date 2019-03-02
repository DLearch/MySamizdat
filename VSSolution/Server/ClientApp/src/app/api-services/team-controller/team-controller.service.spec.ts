import { TestBed } from '@angular/core/testing';

import { TeamControllerService } from './team-controller.service';

describe('TeamControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeamControllerService = TestBed.get(TeamControllerService);
    expect(service).toBeTruthy();
  });
});
