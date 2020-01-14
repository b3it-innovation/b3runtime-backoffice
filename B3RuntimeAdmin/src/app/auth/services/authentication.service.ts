import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthenticationError } from 'app/auth/model/authentication-error.model';
import { AuthenticationUser } from 'app/auth/model/authentication-user.model';
import { AuthenticationFirebaseService } from 'app/auth/services/authentication-firebase.service';
import { AuthStoreService } from 'app/auth/store/auth-store.service';
import { AuthState } from 'app/auth/store/auth.state';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {

  constructor(
    private fbService: AuthenticationFirebaseService,
    private store: Store<AuthState>,
    private authStoreService: AuthStoreService) {

    // register subscription for auth changes in the firebase service
    fbService.getAuthStateChange().subscribe(
      (user: AuthenticationUser) => {
        this.authStoreService.userStateChange(user);
      },
      (error: AuthenticationError) => {
        this.authStoreService.authError(error);
      }
    )
  }

  getUser() {

  }

  registerUserByEmail(email: string, password: string, firstName: string, lastName: string): Observable<AuthenticationUser | AuthenticationError> {
    return this.fbService.registerUserByEmail(email, password, firstName, lastName);
  }

  signInUserByMail(email: string, password: string): Observable<AuthenticationUser | AuthenticationError> {
    return this.fbService.signInUserByEmail(email, password);
  }

  resendVerificationEmail(): Observable<AuthenticationError> {
    return this.fbService.resendVerificationEmail();
  }

  sendResetPasswordMail(email: string): Observable<AuthenticationError> {
    return this.fbService.sendResetPasswordMail(email);
  }

  signInUserByGmail(): Observable<AuthenticationUser | AuthenticationError> {
    return this.fbService.signInWithGoogle();
  }

  updateUserPhoto(displayPhotoUrl: string): Observable<any | AuthenticationError> {
    return this.fbService.updateUserPhoto(displayPhotoUrl);
  }

  logout(): Observable<AuthenticationError> {
    return this.fbService.signOut();
  }
}
