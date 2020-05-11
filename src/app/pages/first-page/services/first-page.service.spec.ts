import { TestBed, inject } from '@angular/core/testing';

import { FirstPageService } from './first-page.service';

describe('FirstPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirstPageService]
    });
  });

  it('should be created', inject([FirstPageService], (service: FirstPageService) => {
    expect(service).toBeTruthy();
  }));
});
