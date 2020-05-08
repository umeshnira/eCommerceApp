import { TestBed } from '@angular/core/testing';

import { LocalCartStorageService } from './local-cart-storage.service';

describe('LocalCartStorageService', () => {
  let service: LocalCartStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalCartStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
