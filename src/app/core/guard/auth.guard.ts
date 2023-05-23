import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.getUserInfo().pipe(
    map((userData) => {
      if(userData) {
        return true
      }else {
        return router.createUrlTree(['/']);
      }
    })
    
  )
  
};
