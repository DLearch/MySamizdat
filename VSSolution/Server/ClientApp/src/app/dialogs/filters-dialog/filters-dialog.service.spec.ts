import { TestBed } from '@angular/core/testing';

import { FiltersDialogService } from './filters-dialog.service';

describe('FiltersDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FiltersDialogService = TestBed.get(FiltersDialogService);
    expect(service).toBeTruthy();
  });
});
