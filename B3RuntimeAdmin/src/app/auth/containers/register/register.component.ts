import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationError } from 'app/auth/model/authentication-error.model';
import { RegisterUserRequest } from 'app/auth/payload/registerUser';
import { AuthStoreService } from 'app/auth/store/auth-store.service';
import { grow } from 'app/core/shared/animations/router.animations';
import { RouterNGRXService } from 'app/core/store/router/app-router.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [grow()]
})

export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  error$: Observable<AuthenticationError>;
  isLoading$: Observable<boolean>;
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
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onRegisterUser() {
    if (this.registerForm.valid) {
      const registerUser: RegisterUserRequest = {
        email: this.registerForm.value.email,
        password: this.registerForm.value.passwords.password,
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName
      }

      // send payload to ngrx action
      this.authStoreService.registerUser(registerUser);
    } else {
      return false;
    }
  }

  onGoBack() {
    this.routerService.routeBack();
  }

  private buildForm(): void {
    this.registerForm = this.fBuilder.group({
      firstName: ['', [
        Validators.required,
      ]],
      lastName: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      passwords: this.fBuilder.group({
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      }, { validator: this.areEqual })
    });
  }

  private areEqual(group: FormGroup) {
    const pwdControl = group.controls['password'];
    const rptPwdControl = group.controls['confirmPassword'];

    if ((pwdControl.value === rptPwdControl.value) || rptPwdControl.value.length < 1) {
      return null;
    }

    return {
      areEqual: true
    };
  }
}
