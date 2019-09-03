import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationError } from 'app/auth/model/authentication-error.model';
import { AuthenticationUser } from 'app/auth/model/authentication-user.model';
import { AuthStoreService } from 'app/auth/store/auth-store.service';
import { grow } from 'app/core/shared/animations/router.animations';
import { RouterNGRXService } from 'app/core/store/router/app-router.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
  animations: [grow()]
})
export class VerifyEmailComponent implements OnInit, OnDestroy {

  user$: Observable<AuthenticationUser>;
  error$: Observable<AuthenticationError>;
  isLoading$: Observable<boolean>;
  verificationSent$: Observable<boolean>;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private routerService: RouterNGRXService,
    private authStoreService: AuthStoreService) { }

  ngOnInit() {
    this.user$ = this.authStoreService.selectUser().takeUntil(this.ngUnsubscribe);
    this.error$ = this.authStoreService.selectError().takeUntil(this.ngUnsubscribe);
    this.isLoading$ = this.authStoreService.selectIsLoading().takeUntil(this.ngUnsubscribe);
    this.verificationSent$ = this.authStoreService.selectEmailVerificationSent().takeUntil(this.ngUnsubscribe);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onResendVerification() {
    this.authStoreService.sendEmailVerification();
  }

  onGoBack() {
    this.routerService.routeToLocation(['/login']);
  }

}
