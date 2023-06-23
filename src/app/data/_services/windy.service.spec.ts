import { TestBed } from '@angular/core/testing';

import { WindyService } from './windy.service';

describe('WindyService', () => {
  let service: WindyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
