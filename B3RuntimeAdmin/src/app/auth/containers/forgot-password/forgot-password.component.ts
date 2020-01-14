import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationError } from 'app/auth/model/authentication-error.model';
import { AuthStoreService } from 'app/auth/store/auth-store.service';
import { grow } from 'app/core/shared/animations/router.animations';
import { RouterNGRXService } from 'app/core/store/router/app-router.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ForgotPasswordRequest } from '../../payload/forgotPassword';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [grow()]
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  forgotPasswordForm: FormGroup;
  error$: Observable<AuthenticationError>;
  isLoading$: Observable<boolean>;
  forgotPasswordSent$: Observable<boolean>;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private fBuilder: FormBuilder,
    private routerService: RouterNGRXService,
    private authStoreService: AuthStoreService) {
  }

  ngOnInit() {
    this.buildForm();

    this.error$ = this.authStoreService.selectError().takeUntil(this.ngUnsubscribe);
    this.isLoading$ = this.authStoreService.selectIsLoading().takeUntil(this.ngUnsubscribe);
    this.forgotPasswordSent$ = this.authStoreService.selectForgotPasswordSent().takeUntil(this.ngUnsubscribe);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onForgotPassword() {
    if (this.forgotPasswordForm.valid) {
      const request: ForgotPasswordRequest = {
        email: this.forgotPasswordForm.value.email
      }

      this.authStoreService.sendForgotPassword(request);
    } else {
      return false;
    }
  }

  onGoBack() {
    this.routerService.routeBack();
  }

  private buildForm(): void {
    this.forgotPasswordForm = this.fBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]]
    });
  }

}
