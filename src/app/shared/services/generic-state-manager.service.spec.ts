import { TestBed } from '@angular/core/testing';

import { GenericStateManagerService } from './generic-state-manager.service';

describe('GenericStateManagerService', () => {
  let service: GenericStateManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericStateManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
