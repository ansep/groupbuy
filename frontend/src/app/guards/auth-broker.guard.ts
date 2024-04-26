import { CanActivateFn } from '@angular/router';

export const authBrokerGuard: CanActivateFn = (route, state) => {
  return true;
};
