import { TestBed } from '@angular/core/testing';

import { NentangService } from './nentang.service';

describe('NentangService', () => {
  let service: NentangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NentangService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
