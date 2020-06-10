import { TestBed } from '@angular/core/testing';

import { SubProductTypeService } from './subProductType.service';

describe('SubProductTypeService', () => {
  let service: SubProductTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubProductTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
