import { TestBed } from '@angular/core/testing';

import { ItemsResolverService } from './items-resolver.service';

describe('ItemsResolverService', () => {
  let service: ItemsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
