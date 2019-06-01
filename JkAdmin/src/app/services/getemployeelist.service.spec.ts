import { TestBed } from '@angular/core/testing';

import { GetemployeelistService } from './getemployeelist.service';

describe('GetemployeelistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetemployeelistService = TestBed.get(GetemployeelistService);
    expect(service).toBeTruthy();
  });
});
