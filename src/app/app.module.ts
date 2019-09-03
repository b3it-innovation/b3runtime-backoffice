import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './core/shared/shared.module';
import { MapModule } from './map/map.module';
import { QuizModule } from './quiz/quiz.module';
import { AppStoreModule } from './store/app-store.module';

import {MATERIAL_COMPATIBILITY_MODE} from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // Angular
    BrowserModule,
    BrowserAnimationsModule,

    // Routing
    AppRoutingModule,

    // Shared module
    SharedModule,

    // ngrx
    AppStoreModule.forRoot(),

    // Custom modules
    AuthModule,
    QuizModule,
    MapModule

  ],
  providers: [
    {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

}
