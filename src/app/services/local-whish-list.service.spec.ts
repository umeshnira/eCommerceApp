import { TestBed } from '@angular/core/testing';

import { LocalWhishListService } from './local-whish-list.service';

describe('LocalWhishListService', () => {
  let service: LocalWhishListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalWhishListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
