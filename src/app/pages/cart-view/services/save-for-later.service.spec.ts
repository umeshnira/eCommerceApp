import { TestBed } from '@angular/core/testing';

import { SaveForLaterService } from './save-for-later.service';

describe('SaveForLaterService', () => {
  let service: SaveForLaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveForLaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
