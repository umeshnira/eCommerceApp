import { TestBed, inject } from '@angular/core/testing';

import { LocalCartStorageService } from './local-cart-storage.service';

describe('LocalCartStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalCartStorageService]
    });
  });

  it('should be created', inject([LocalCartStorageService], (service: LocalCartStorageService) => {
    expect(service).toBeTruthy();
  }));
});
