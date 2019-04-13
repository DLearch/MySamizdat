import { TestBed, inject } from '@angular/core/testing';

import { NotificationControllerService } from './notification-controller.service';

describe('NotificationControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationControllerService]
    });
  });

  it('should be created', inject([NotificationControllerService], (service: NotificationControllerService) => {
    expect(service).toBeTruthy();
  }));
});
