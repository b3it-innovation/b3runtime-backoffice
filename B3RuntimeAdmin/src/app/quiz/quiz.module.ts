import { QuestionItemListComponent } from './components/question-item-list/question-item-list.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'app/core/shared/shared.module';
import { CategoriesPageComponent } from 'app/quiz/containers/categories-page/categories-page.component';
import { QuizRoutingModule } from 'app/quiz/quiz-routing.module';
import { QuizStoreModule } from 'app/quiz/store/quiz-store.module';

import { QuickCategoriesComponent } from './components/quick-categories/quick-categories.component';
import { QuickTagComponent } from './components/quick-tag/quick-tag.component';
import { AddCategoryComponent } from './containers/add-category/add-category.component';
import { CategoriesListComponent } from './containers/categories-list/categories-list.component';
import { CreateQuestionComponent } from './containers/create-question/create-question.component';
import { QuestionsListComponent } from './containers/questions-list/questions-list.component';
import { QuizOverviewComponent } from './containers/quiz-overview/quiz-overview.component';
import { QuizFirebaseService } from './services/quiz-firebase.service';
import { QuizService } from './services/quiz.service';
import { CategoryInputAutocompleteComponent } from 'app/quiz/components/category-input-autocomplete/category-input-autocomplete.component';
import { EditQuestionComponent } from './containers/edit-question/edit-question.component';
import { QuestionListTableDataSource } from './containers/questions-list/question-list-table-data-source';
import { DrabbagleQuestionsListComponent } from './containers/draggable-question-list/draggable-questions-list.component';




@NgModule({
  declarations: [
    QuizOverviewComponent,

    CreateQuestionComponent,
    QuestionsListComponent,
    DrabbagleQuestionsListComponent,
    QuestionItemListComponent,
   EditQuestionComponent,

    CategoriesPageComponent,
    AddCategoryComponent,
    CategoriesListComponent,
    CategoryInputAutocompleteComponent,
    QuickCategoriesComponent,

    QuickTagComponent,
  ],
  imports: [
    // Angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
  
    // NGRX
    QuizStoreModule,

    // Routing
    QuizRoutingModule,

    // shared module
    SharedModule
  ],
  providers: [
    QuizService,
    QuizFirebaseService
  ],
  exports: [
    DrabbagleQuestionsListComponent
  ],
  entryComponents: [QuestionItemListComponent],
})

export class QuizModule { }
