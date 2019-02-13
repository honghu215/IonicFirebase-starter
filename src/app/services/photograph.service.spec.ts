import { TestBed } from '@angular/core/testing';

import { PhotographService } from './photograph.service';

describe('PhotographService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhotographService = TestBed.get(PhotographService);
    expect(service).toBeTruthy();
  });
});
