import { TestBed } from '@angular/core/testing';

import { OneItemResolverService } from './one-item-resolver.service';

describe('OneItemResolverService', () => {
  let service: OneItemResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OneItemResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
