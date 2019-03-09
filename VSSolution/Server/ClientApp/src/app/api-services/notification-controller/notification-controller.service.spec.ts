import { TestBed } from '@angular/core/testing';

import { NotificationControllerService } from './notification-controller.service';

describe('NotificationControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationControllerService = TestBed.get(NotificationControllerService);
    expect(service).toBeTruthy();
  });
});
