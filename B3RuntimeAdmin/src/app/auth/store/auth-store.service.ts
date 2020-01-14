import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/store/app.state';
import { BasicStoreService } from 'app/store/basic-store.service';
import { Observable } from 'rxjs/Observable';

import { AuthenticationError } from '../model/authentication-error.model';
import { AuthenticationUser } from '../model/authentication-user.model';
import { LoginRequest } from '../payload/login';
import { ForgotPasswordRequest } from './../payload/forgotPassword';
import { RegisterUserRequest } from './../payload/registerUser';
import { AuthActions } from './auth.actions';
import { AuthState } from './auth.state';


@Injectable()
export class AuthStoreService extends BasicStoreService {
    protected readonly STATE = 'auth';

    constructor(
        protected store: Store<AppState>,
        private authActions: AuthActions
    ) {
        super();
    }

    // Fetching states from NGRX store
    selectError(): Observable<AuthenticationError> {
        return this.storeSelectFeatureState().map((state: AuthState) => state.error);
    }

    selectAuthState(): Observable<AuthState> {
        return this.storeSelectFeatureState().map((state: AuthState) => state);
    }

    selectIsLoggedIn(): Observable<boolean> {
        return this.storeSelectFeatureState().map((state: AuthState) => state.isLoggedIn);
    }

    selectIsVerified(): Observable<boolean> {
        return this.storeSelectFeatureState().map((state: AuthState) => state.user.verified);
    }

    selectUser(): Observable<AuthenticationUser> {
        return this.storeSelectFeatureState().map((state: AuthState) => state.user);
    }

    selectIsLoading(): Observable<boolean> {
        return this.storeSelectFeatureState().map((state: AuthState) => state.isLoading);
    }

    selectEmailVerificationSent(): Observable<boolean> {
        return this.storeSelectFeatureState().map((state: AuthState) => state.emailVerificationSent);
    }

    selectForgotPasswordSent(): Observable<boolean> {
        return this.storeSelectFeatureState().map((state: AuthState) => state.forgotPasswordSent);
    }


    // Sending events to NGRX store
    loginUser(request: LoginRequest) {
        this.dispatchAction(this.authActions.loginAction(request));
    }

    registerUser(request: RegisterUserRequest) {
        this.dispatchAction(this.authActions.registerUserAction(request));
    }

    googleLogin() {
        this.dispatchAction(this.authActions.loginGoogleAction());
    }

    logout() {
        this.dispatchAction(this.authActions.logoutAction());
    }

    sendEmailVerification() {
        this.dispatchAction(this.authActions.sendVerificationAction());
    }

    sendForgotPassword(request: ForgotPasswordRequest) {
        this.dispatchAction(this.authActions.sendForgotPasswordAction(request));
    }

    userStateChange(user: AuthenticationUser) {
        this.dispatchAction(this.authActions.userStateChangeAction(user));
    }

    authError(error: AuthenticationError) {
        this.dispatchAction(this.authActions.authErrorAction(error));
    }
}
