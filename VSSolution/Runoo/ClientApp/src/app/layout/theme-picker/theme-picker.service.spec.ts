import { TestBed, inject } from '@angular/core/testing';

import { ThemePickerService } from './theme-picker.service';

describe('ThemePickerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemePickerService]
    });
  });

  it('should be created', inject([ThemePickerService], (service: ThemePickerService) => {
    expect(service).toBeTruthy();
  }));
});
