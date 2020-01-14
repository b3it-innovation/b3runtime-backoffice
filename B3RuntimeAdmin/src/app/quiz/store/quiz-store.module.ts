import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { QuizStoreService } from './quiz-store.service';
import { QuizActions } from './quiz.actions';
import { QuizEffects } from './quiz.effects';
import { reducer } from './quiz.reducer';

// import AuthStoreModule in the AuthModule
@NgModule({
    imports: [
        StoreModule.forFeature('quiz', reducer),
        EffectsModule.forFeature([QuizEffects])
    ],
    exports: [
        StoreModule,
        EffectsModule
    ],
    providers: [
        QuizStoreService,
        QuizActions
    ]
})

export class QuizStoreModule { }
