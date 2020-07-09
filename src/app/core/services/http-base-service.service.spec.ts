import { TestBed } from '@angular/core/testing';

import { HttpBaseServiceService } from './http-base-service.service';

describe('HttpBaseServiceService', () => {
  let service: HttpBaseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpBaseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
