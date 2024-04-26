import { CanActivateFn } from '@angular/router';

export const authBuyerChildGuard: CanActivateFn = (route, state) => {
  return true;
};
