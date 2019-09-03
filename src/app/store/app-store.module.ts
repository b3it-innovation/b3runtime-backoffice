import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterEffects } from 'app/core/store/router/app-router.effects';
import { RouterNGRXService } from 'app/core/store/router/app-router.service';
import { environment } from 'environments/environment';

import { reducers } from './app.reducer';

// import { ActionCreator } from './util/action-creator';
// import AppStoreModule.forRoot() in the AppModule after router module
@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([RouterEffects]),
    // TODO: Ta bort kommentar. Just nu orsakar den en krasch i Redux Dev Tools
    // StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : []
  ],
  exports: [StoreModule]
})

export class AppStoreModule {
  static forRoot() {
    return {
      ngModule: AppStoreModule,
      providers: [
        RouterNGRXService
      ]
    };
  }
}
