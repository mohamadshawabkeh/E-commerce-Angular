import { TestBed } from '@angular/core/testing';

import { CartConfigService } from './cart-config.service';

describe('CartConfigService', () => {
  let service: CartConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
