import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthStoreService } from './auth-store.service';
import { AuthActions } from './auth.actions';
import { AuthEffects } from './auth.effects';
import { reducer } from './auth.reducer';

// import AuthStoreModule in the AuthModule
@NgModule({
    imports: [
        StoreModule.forFeature('auth', reducer),
        EffectsModule.forFeature([AuthEffects])
    ],
    exports: [
        StoreModule,
        EffectsModule
    ],
    providers: [
        AuthStoreService,
        AuthActions
    ]
})

export class AuthStoreModule { }
