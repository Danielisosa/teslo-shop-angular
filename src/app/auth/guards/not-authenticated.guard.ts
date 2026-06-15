import { AuthService } from '@auth/services/auth.service';
import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { firstValueFrom } from 'rxjs';

export const NotAuthenticatedGuard: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[]
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.token?.();
  const isAuthenticated = !!token;

  if (isAuthenticated) {
    router.navigateByUrl('/');
    return false;
  }

  return true;
}
