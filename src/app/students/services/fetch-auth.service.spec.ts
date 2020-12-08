import { TestBed } from '@angular/core/testing';

import { FetchAuthService } from './fetch-auth.service';

describe('FetchAuthService', () => {
  let service: FetchAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
