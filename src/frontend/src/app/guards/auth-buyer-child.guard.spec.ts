import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authBuyerChildGuard } from './auth-buyer-child.guard';

describe('authBuyerChildGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authBuyerChildGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
