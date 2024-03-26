import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authBuyerGuard } from './auth-buyer.guard';

describe('authBuyerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authBuyerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
