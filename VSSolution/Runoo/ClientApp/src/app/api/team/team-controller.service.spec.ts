import { TestBed, inject } from '@angular/core/testing';

import { TeamControllerService } from './team-controller.service';

describe('TeamControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamControllerService]
    });
  });

  it('should be created', inject([TeamControllerService], (service: TeamControllerService) => {
    expect(service).toBeTruthy();
  }));
});
