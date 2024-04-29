import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const authBrokerGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  if (!token) {
    router.navigate(['/']);
    return false;
  }
  if (localStorage.getItem('role') === 'broker') {
    return true;
  }
  router.navigate(['/']);
  return false;
};
