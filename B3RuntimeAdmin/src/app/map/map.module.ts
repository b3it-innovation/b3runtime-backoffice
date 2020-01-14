import { AgmCoreModule } from '@agm/core';
import { DefineMapComponent } from './containers/define-map/define-map.component';
import { MapsOverviewComponent } from './containers/maps-overview/maps-overview.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'app/core/shared/shared.module';
import { MapRoutingModule } from 'app/map/map-routing.module';
import { MapFirebaseService } from './services/map-firebase.service';
import { MapService } from './services/map.service';
import { MapStoreService } from './store/map-store.service';
import { MapActions } from './store/map.actions';
import { MapStoreModule } from './store/map-store.module';




@NgModule({
  declarations: [
    MapsOverviewComponent,
    DefineMapComponent

  ],
  imports: [
    // Angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedModule,

  

    // NGRX
    MapStoreModule,

    // Routing
    MapRoutingModule,

    // Google Maps
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDSeOT7VpxUocITZpFl56TVa-yVVUyql0g'
    }),

    // shared module
    SharedModule
  ],
  providers: [
    MapService,
    MapFirebaseService
  ],
  exports: [
DefineMapComponent
  ],
  entryComponents: [],
})

export class MapModule { }
