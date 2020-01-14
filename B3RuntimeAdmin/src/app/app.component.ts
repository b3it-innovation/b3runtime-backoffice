import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AuthenticationUser } from './auth/model/authentication-user.model';
import { AuthStoreService } from './auth/store/auth-store.service';
import { routerTransition } from './core/shared/animations/router.transitions';
import { RegisterAssetsService } from './core/shared/services/register-assets.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition]
})
export class AppComponent implements OnInit, OnDestroy {

  user$: Observable<AuthenticationUser>;
  isLoggedIn$: Observable<boolean>;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private regAssets: RegisterAssetsService,
    private authStoreService: AuthStoreService) {
    regAssets.registerAssets();
  }

  public ngOnInit(): void {
    this.user$ = this.authStoreService.selectUser().takeUntil(this.ngUnsubscribe);
    this.isLoggedIn$ = this.authStoreService.selectIsLoggedIn().takeUntil(this.ngUnsubscribe);
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onLogout() {
    this.authStoreService.logout();
  }

}
