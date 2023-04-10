import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { authState, Auth } from '@angular/fire/auth';
import { take, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(
    private auth: Auth,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return authState(this.auth).pipe(
      take(1),
      map((user) => {
        const auth = !!user;
        if (auth && user.emailVerified) {
          return this.router.createUrlTree(['/dashboard']);
        }
        return true;
      })
    );
  }
}
