import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authBrokerChildGuard } from './auth-broker-child.guard';

describe('authBrokerChildGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authBrokerChildGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
