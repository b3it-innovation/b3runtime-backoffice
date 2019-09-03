import { QuestionsListComponent } from './containers/questions-list/questions-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesPageComponent } from './containers/categories-page/categories-page.component';
import { CreateQuestionComponent } from './containers/create-question/create-question.component';
import { QuizOverviewComponent } from './containers/quiz-overview/quiz-overview.component';
import { AuthGuard } from 'app/auth/guard/auth-guard.service';

const routes: Routes = [
  {
    path: 'quiz-home',
    component: QuizOverviewComponent,
    data: { requiresLogin: true },
    canActivate: [AuthGuard]
  },
  {
    path: 'categories',
    component: CategoriesPageComponent,
    data: { requiresLogin: false },
    canActivate: [AuthGuard]
  },
  {
    path: 'questions-list',
    component: QuestionsListComponent,
    data: { requiresLogin: false },
    canActivate: [AuthGuard]
  },
  {
    path: 'create-question',
    component: CreateQuestionComponent,
    data: { requiresLogin: false },
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
