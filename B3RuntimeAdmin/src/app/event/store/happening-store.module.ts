import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HappeningStoreService } from './happening-store.service';
import { HappeningActions } from './happening.actions';
import { HappeningEffects } from './happening.effects';
import { reducer } from './happening.reducer';

// import AuthStoreModule in the AuthModule
@NgModule({
    imports: [
        StoreModule.forFeature('happening', reducer),
        EffectsModule.forFeature([HappeningEffects])
    ],
    exports: [
        StoreModule,
        EffectsModule
    ],
    providers: [
        HappeningStoreService,
        HappeningActions
    ]
})

export class HappeningStoreModule { }
