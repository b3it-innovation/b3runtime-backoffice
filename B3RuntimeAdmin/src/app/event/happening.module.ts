
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'app/core/shared/shared.module';
import { HappeningFirebaseService } from './services/happening-firebase.service';
import { HappeningService } from './services/happening.service';
import { HappeningRoutingModule } from './happening-routing.module';
import { QuizModule } from '../quiz/quiz.module';
import { MapModule } from '../map/map.module';
import { DragDropQuestion } from './containers/drag-drop-question/drag-drop-question.component';
import { HappeningOverviewComponent } from './containers/happening-overview/happening-overview.component';
import { DefineHappeningComponen } from './containers/define-happening/define-happening.component';
import { HappeningStoreModule } from './store/happening-store.module';
import { MatDatepickerModule } from '@angular/material';


@NgModule({
  declarations: [
    HappeningOverviewComponent,
    DragDropQuestion,
    DefineHappeningComponen
  ],
  imports: [
    // Angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    QuizModule,
    MapModule,
    MatDatepickerModule,
    
  
  
    // NGRX
HappeningStoreModule,

    // Routing
    HappeningRoutingModule,


    // shared module
    SharedModule
  ],
  providers: [
    HappeningService,
    HappeningFirebaseService
  ],
  exports: [
  
  ],
  entryComponents: [],
})

export class HappeningModule { }
