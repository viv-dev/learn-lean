import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { first, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.processAuthState();
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.processAuthState();
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.processAuthState();
  }

  private async processAuthState(): Promise<boolean> {
    // Wait for the first true value to ensure we get
    // the correct auth state
    await this.authService
      .isAuthInitialised()
      .pipe(
        first((v) => v),
        take(1)
      )
      .toPromise();

    const authenticated = await this.authService
      .isAuthenticated()
      .pipe(take(1))
      .toPromise();

    if (!authenticated) {
      this.router.navigate(['/login']);
    }
    return authenticated;
  }
}
