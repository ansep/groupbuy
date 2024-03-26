import { CanActivateFn } from '@angular/router';

export const authBrokerChildGuard: CanActivateFn = (route, state) => {
  return true;
};
