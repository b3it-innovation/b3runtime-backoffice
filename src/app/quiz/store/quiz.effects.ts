import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { RouterNGRXService } from 'app/core/store/router/app-router.service';
import { Observable } from 'rxjs/Observable';

import { Category } from '../model/category.model';
import { QuizError } from '../model/error.model';
import { AddCategoryRequest } from '../payload/category';
import { AddQuestionRequest } from '../payload/question';
import { Question } from './../model/question.model';
import { DeleteCategoryRequest } from './../payload/category';
import { DeleteQuestionRequest } from './../payload/question';
import { QuizService } from './../services/quiz.service';
import { QuizActions } from './quiz.actions';


@Injectable()
export class QuizEffects {

  // Categories
  @Effect()
  addCategory$: Observable<Action> = this.actions$
    .ofType(QuizActions.Types.ADD_CATEGORY)
    .map(toPayload)
    .switchMap((data: AddCategoryRequest) => this.quizService.addCategory(data.name)
      .map((response: Category) => this.quizActions.addCategorySuccessAction({ category: response }))
      .catch((error: QuizError) => {
        error.action = QuizActions.Types.ADD_CATEGORY;
        return Observable.of(this.quizActions.quizErrorAction(error));
      }));

  @Effect()
  deleteCategory$: Observable<Action> = this.actions$
    .ofType(QuizActions.Types.DELETE_CATEGORY)
    .map(toPayload)
    .switchMap((data: DeleteCategoryRequest) => this.quizService.deleteCategory(data.category)
      .map(() => this.quizActions.deleteCategorySuccessAction({ category: data.category }))
      .catch((error: QuizError) => {
        error.action = QuizActions.Types.ADD_CATEGORY;
        return Observable.of(this.quizActions.quizErrorAction(error));
      }));

  @Effect()
  getCategories$: Observable<Action> = this.actions$
    .ofType(QuizActions.Types.GET_CATEGORIES)
    .map(toPayload)
    .switchMap((data: string) => this.quizService.getCategories()
      .map((response: Category[]) => this.quizActions.getCategoriesSuccessAction({ categories: response }))
      .catch((error: QuizError) => {
        error.action = QuizActions.Types.ADD_CATEGORY;
        return Observable.of(this.quizActions.quizErrorAction(error));
      }));

  // Questions
  @Effect()
  addQuestion$: Observable<Action> = this.actions$
    .ofType(QuizActions.Types.ADD_QUESTION)
    .map(toPayload)
    .switchMap((data: AddQuestionRequest) => this.quizService.addQuestion(data.question)
      .map((response) => this.quizActions.addQuestionSuccessAction({ question: data.question }))
      .catch((error: QuizError) => {
        error.action = QuizActions.Types.ADD_CATEGORY;
        return Observable.of(this.quizActions.quizErrorAction(error));
      }));

  @Effect()
  deleteQuestion$: Observable<Action> = this.actions$
    .ofType(QuizActions.Types.DELETE_QUESTION)
    .map(toPayload)
    .switchMap((data: DeleteQuestionRequest) => this.quizService.deleteQuestion(data.question)
      .map(() => this.quizActions.deleteQuestionSuccessAction({ question: data.question }))
      .catch((error: QuizError) => {
        error.action = QuizActions.Types.ADD_CATEGORY;
        return Observable.of(this.quizActions.quizErrorAction(error));
      }));

  @Effect()
  getQuestion$: Observable<Action> = this.actions$
    .ofType(QuizActions.Types.GET_QUESTIONS)
    .map(toPayload)
    .switchMap(() => this.quizService.getQuestions()
      .map((response: Question[]) => this.quizActions.getQuestionsSuccessAction({ questions: response }))
      .catch((error: QuizError) => {
        error.action = QuizActions.Types.ADD_CATEGORY;
        return Observable.of(this.quizActions.quizErrorAction(error));
      }));

  constructor(
    private actions$: Actions,
    private quizActions: QuizActions,
    private quizService: QuizService,
    private routerService: RouterNGRXService) { }
}

