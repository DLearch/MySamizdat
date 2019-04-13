import { TestBed, inject } from '@angular/core/testing';

import { FiltersDialogService } from './filters-dialog.service';

describe('FiltersDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FiltersDialogService]
    });
  });

  it('should be created', inject([FiltersDialogService], (service: FiltersDialogService) => {
    expect(service).toBeTruthy();
  }));
});
