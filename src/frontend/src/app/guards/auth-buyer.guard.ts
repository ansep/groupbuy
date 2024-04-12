import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authBuyerGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  if (!token) {
    router.navigate(['/']);
    return false;
  }
  if (localStorage.getItem('role') === 'buyer') {
    return true;
  }
  router.navigate(['/']);
  return false;
};
