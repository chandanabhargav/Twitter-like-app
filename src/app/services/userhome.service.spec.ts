import { TestBed } from '@angular/core/testing';

import { UserhomeService } from './userhome.service';

describe('UserhomeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserhomeService = TestBed.get(UserhomeService);
    expect(service).toBeTruthy();
  });
});
