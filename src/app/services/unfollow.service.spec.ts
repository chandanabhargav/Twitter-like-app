import { TestBed } from '@angular/core/testing';

import { UnfollowService } from './unfollow.service';

describe('UnfollowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnfollowService = TestBed.get(UnfollowService);
    expect(service).toBeTruthy();
  });
});
