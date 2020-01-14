import { ForgotPasswordRequest } from '../payload/forgotPassword';
import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { AuthenticationError } from 'app/auth/model/authentication-error.model';
import { AuthenticationUser } from 'app/auth/model/authentication-user.model';
import { AuthenticationService } from 'app/auth/services/authentication.service';
import { RouterNGRXService } from 'app/core/store/router/app-router.service';
import { Observable } from 'rxjs/Observable';

import { LoginRequest } from '../payload/login';
import { LoginStateCheckRequest } from './../payload/login';
import { RegisterUserRequest } from './../payload/registerUser';
import { AuthActions } from './auth.actions';


@Injectable()
export class AuthEffects {

  // Login
  @Effect()
  loginAction$: Observable<Action> = this.actions$
    .ofType(AuthActions.Types.LOGIN)
    .map(toPayload)
    .switchMap((data: LoginRequest) => this.authService.signInUserByMail(data.email, data.password)
      .map((authUser: AuthenticationUser) => this.authActions.loginStateCheckAction({ user: authUser, provider: 'password' }))
      .catch((authError: AuthenticationError) => Observable.of(this.authActions.authErrorAction(authError)))
    );

  @Effect()
  loginStateCheckAction$: Observable<Action> = this.actions$
    .ofType(AuthActions.Types.LOGIN_STATE_CHECK)
    .map(toPayload)
    .map((data: LoginStateCheckRequest) => {
      if (data.user.verified) {
        return this.authActions.loginSuccessAction({ user: data.user });
      } else {
        return this.authActions.waitingVerificationAction();
      }
    });

  @Effect()
  loginGoogleAction$: Observable<Action> = this.actions$
    .ofType(AuthActions.Types.LOGIN_GOOGLE)
    .switchMap(() => this.authService.signInUserByGmail()
      .map((authUser: AuthenticationUser) => this.authActions.loginSuccessAction({ user: authUser }))
      .catch((authError: AuthenticationError) => Observable.of(this.authActions.authErrorAction(authError)))
    );

  // Email Verification
  @Effect({ dispatch: false })
  waitingVerifcationAction$: Observable<Action> = this.actions$
    .ofType(AuthActions.Types.WAITING_VERIFICATION)
    .map(toPayload)
    .do(() => this.routerService.routeToLocation(['/verify-email']));

  @Effect()
  resendVerifcationAction$: Observable<Action> = this.actions$
    .ofType(AuthActions.Types.SEND_VERIFICATION)
    .switchMap(() => this.authService.resendVerificationEmail()
      .map(() => this.authActions.sendVerificationSuccessAction())
      .catch((authError: AuthenticationError) => Observable.of(this.authActions.authErrorAction(authError)))
    );

  // Forgot password
  @Effect()
  forgotPasswordAction$: Observable<Action> = this.actions$
    .ofType(AuthActions.Types.SEND_FORGOT_PASSWORD)
    .map(toPayload)
    .switchMap((data: ForgotPasswordRequest) => this.authService.sendResetPasswordMail(data.email)
      .map(() => this.authActions.sendForgotPasswordSuccessAction())
      .catch((authError: AuthenticationError) => Observable.of(this.authActions.authErrorAction(authError)))
    );

  // Register User
  @Effect()
  registerUserAction$: Observable<Action> = this.actions$
    .ofType(AuthActions.Types.REGISTER_USER)
    .map(toPayload)
    .switchMap((data: RegisterUserRequest) => this.authService.registerUserByEmail(data.email, data.password, data.firstName, data.lastName)
      .map((authUser: AuthenticationUser) => this.authActions.registerUserSuccessAction({ user: authUser, firstName: data.firstName, lastName: data.lastName }))
      .catch((authError: AuthenticationError) => Observable.of(this.authActions.authErrorAction(authError)))
    );

  // Logout
  @Effect()
  logoutRequestedAction$: Observable<Action> = this.actions$
    .ofType(AuthActions.Types.LOGOUT)
    .switchMap(() => this.authService.logout()
      .map(() => this.authActions.logoutSuccessAction())
      .catch((authError: AuthenticationError) => Observable.of(this.authActions.authErrorAction(authError)))
    );

  @Effect({ dispatch: false })
  logoutSuccessAction$: Observable<Action> = this.actions$
    .ofType(AuthActions.Types.LOGOUT_SUCCESS)
    .do(() => this.routerService.routeToLocation(['/']));

  constructor(
    private actions$: Actions,
    private authActions: AuthActions,
    private authService: AuthenticationService,
    private routerService: RouterNGRXService) { }
}

