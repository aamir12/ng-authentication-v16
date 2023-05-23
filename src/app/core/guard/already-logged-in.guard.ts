import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

export const alreadyLoggedInGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.getUserInfo().pipe(
    map((userData) => {
      if(!userData) {
        return true
      }else {
        return router.createUrlTree(['/dashboard']);
      }
    })
  )
  
};
