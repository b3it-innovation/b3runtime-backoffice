import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
 import { MapEffects } from './map.effects';
 import { reducer } from './map.reducer';
import { MapStoreService } from './map-store.service';
import { MapActions } from './map.actions';

// import AuthStoreModule in the AuthModule
@NgModule({
    imports: [
        StoreModule.forFeature('map', reducer),
        EffectsModule.forFeature([MapEffects])
    ],
    exports: [
        StoreModule,
        EffectsModule
    ],
    providers: [
        MapStoreService,
        MapActions
    ]
})

export class MapStoreModule { }
