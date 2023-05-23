import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  console.log(route.data);
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.getUserInfo().pipe(
    map((userData) => {
      if(userData) {
        const {roles}  = route.data;
        if(roles.length === 0 || roles.includes(userData.role)) {
          return true
        }
        
        return router.createUrlTree(['/dashboard']);
      }else {
        return router.createUrlTree(['/']);
      }
    })
  )
  
};
