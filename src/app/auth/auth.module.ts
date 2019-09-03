import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationFirebaseService } from 'app/auth/services/authentication-firebase.service';
import { SharedModule } from 'app/core/shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPasswordComponent } from './containers/forgot-password/forgot-password.component';
import { LoginComponent } from './containers/login/login.component';
import { RegisterComponent } from './containers/register/register.component';
import { VerifyEmailComponent } from './containers/verify-email/verify-email.component';
import { AuthGuard } from './guard/auth-guard.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthStoreModule } from './store/auth-store.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent
  ],
  imports: [
    // Angular
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    // NGRX
    AuthStoreModule,

    // Routing
    AuthRoutingModule,

    // shared module
    SharedModule
  ],
  providers: [
    AuthenticationService,
    AuthenticationFirebaseService,
    AuthGuard
  ],
  exports: [

  ]
})

export class AuthModule { }
