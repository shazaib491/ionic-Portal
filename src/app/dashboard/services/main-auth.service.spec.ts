import { TestBed } from '@angular/core/testing';

import { MainAuthService } from './main-auth.service';

describe('MainAuthService', () => {
  let service: MainAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
