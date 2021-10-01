import { TestBed } from '@angular/core/testing';

import { JcsnippetsService } from './jcsnippets.service';

describe('JcsnippetsService', () => {
  let service: JcsnippetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JcsnippetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
