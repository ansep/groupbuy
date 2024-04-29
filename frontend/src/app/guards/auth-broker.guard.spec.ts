import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authBrokerGuard } from './auth-broker.guard';

describe('authBrokerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authBrokerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
