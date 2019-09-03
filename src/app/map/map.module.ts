import { AgmCoreModule } from '@agm/core';
import { DefineMapComponent } from './containers/define-map/define-map.component';
import { MapsOverviewComponent } from './containers/maps-overview/maps-overview.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'app/core/shared/shared.module';
import { MapRoutingModule } from 'app/map/map-routing.module';


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

    // NGRX


    // Routing
    MapRoutingModule,

    // Google Maps
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAAh7MEmKrOm7k2due-T1MwXvHY_8L--qw'
    }),

    // shared module
    SharedModule
  ],
  providers: [

  ],
  exports: [

  ],
  entryComponents: [],
})

export class MapModule { }
