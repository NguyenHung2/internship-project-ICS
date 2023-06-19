import { TestBed } from '@angular/core/testing';

import { QuanlysubnetService } from './quanlysubnet.service';

describe('QuanlysubnetService', () => {
  let service: QuanlysubnetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuanlysubnetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
