import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userProfile = sessionStorage.getItem("loggedInUser");
  
  if (userProfile) {
    return true;
  } else {
    router.navigate(['/']); // Redirect to login if not logged in
    return false;
  }
};
