import { CanActivateFn } from '@angular/router';

export const authBuyerGuard: CanActivateFn = (route, state) => {
  return true;
};
