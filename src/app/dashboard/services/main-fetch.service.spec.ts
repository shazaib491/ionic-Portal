import { TestBed } from '@angular/core/testing';

import { MainFetchService } from './main-fetch.service';

describe('MainFetchService', () => {
  let service: MainFetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainFetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
