import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationError } from 'app/auth/model/authentication-error.model';
import { LoginRequest } from 'app/auth/payload/login';
import { AuthStoreService } from 'app/auth/store/auth-store.service';
import { grow } from 'app/core/shared/animations/router.animations';
import { RouterNGRXService } from 'app/core/store/router/app-router.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { filter, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [grow()]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  error$: Observable<AuthenticationError>;
  isLoading$: Observable<boolean>;
  isLoggedIn$: Observable<boolean>;
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
    this.isLoggedIn$ = this.authStoreService.selectIsLoggedIn().takeUntil(this.ngUnsubscribe);

    this.isLoggedIn$.pipe(
      filter((b: boolean) => b),
      distinctUntilChanged()
    ).subscribe(
      {next: _ => this.onLoggedIn() });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private buildForm(): void {
    this.loginForm = this.fBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]        ],
      password: ['', [
Validators.required
      ]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const login: LoginRequest = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }

      this.authStoreService.loginUser(login);
    } else {
      return false;
    }
  }

  onGoogleLogin() {
    this.authStoreService.googleLogin();
  }

  onCreateAccount() {
    this.routerService.routeToLocation(['/register']);
  }

  onForgotPassword() {
    this.routerService.routeToLocation(['/forgot-password']);
  }

  onLoggedIn() {
    this.routerService.routeToLocation(['/']);
  }
}
