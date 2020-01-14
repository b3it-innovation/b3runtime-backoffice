import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router/';
import { AuthStoreService } from 'app/auth/store/auth-store.service';
import { AuthState } from 'app/auth/store/auth.state';
import { RouterNGRXService } from 'app/core/store/router/app-router.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthGuard implements CanActivate, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private authStoreService: AuthStoreService,
        private routerService: RouterNGRXService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        // gets static data from router config
        const requiresLogin = route.data.requiresLogin || false;
        if (!requiresLogin) {
            return true;
        }

        // checks if the user is logged in
        return this.authStoreService.selectAuthState()
            .takeUntil(this.ngUnsubscribe)
            .switchMap((authState: AuthState) => {
                if (!authState.isLoggedIn) {
                    this.routerService.routeToLocation(['/login']);
                    return Observable.of(false);
                } else {
                    if (!authState.user.verified) {
                        this.routerService.routeToLocation(['/verify-email']);
                        return Observable.of(false);
                    } else {
                        return Observable.of(true);
                    }
                }

            });

    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
