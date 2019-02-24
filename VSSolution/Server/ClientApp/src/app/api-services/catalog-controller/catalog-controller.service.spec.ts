import { TestBed } from '@angular/core/testing';

import { CatalogControllerService } from './catalog-controller.service';

describe('CatalogControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatalogControllerService = TestBed.get(CatalogControllerService);
    expect(service).toBeTruthy();
  });
});
