import { ActionState } from './../model/action-state.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Category } from 'app/quiz/model/category.model';
import { AppState } from 'app/store/app.state';
import { BasicStoreService } from 'app/store/basic-store.service';
import { Observable } from 'rxjs/Observable';

import { Question } from '../model/question.model';
import { AddCategoryRequest, DeleteCategoryRequest } from '../payload/category';
import { AddQuestionRequest } from './../payload/question';
import { QuizActions } from './quiz.actions';
import { QuizState } from './quiz.state';

@Injectable()
export class QuizStoreService extends BasicStoreService {
    protected readonly STATE = 'quiz';

    constructor(
        protected store: Store<AppState>,
        private quizActions: QuizActions
    ) {
        super();
    }

    // Fetching states from NGRX store
    selectAddCategoryActionState(): Observable<ActionState> {
        return this.storeSelectFeatureState().map((state: QuizState) => state.loadingStates.addCategory);
    }

    selectAddQuestionActionState(): Observable<ActionState> {
        return this.storeSelectFeatureState().map((state: QuizState) => state.loadingStates.addQuestion);
    }

    selectGetCategoriesActionState(): Observable<ActionState> {
        return this.storeSelectFeatureState().map((state: QuizState) => state.loadingStates.getCategories);
    }

    selectGetQuestionsActionState(): Observable<ActionState> {
        return this.storeSelectFeatureState().map((state: QuizState) => state.loadingStates.getQuestions);
    }

    selectCategories(): Observable<Category[]> {
        return this.storeSelectFeatureState().map((state: QuizState) => state.categories);
    }

    selectQuestions(): Observable<Question[]> {
        return this.storeSelectFeatureState().map((state: QuizState) => state.questions);
    }

    // Sending events to NGRX store
    addCategory(request: AddCategoryRequest) {
        this.dispatchAction(this.quizActions.addCategoryAction(request));
    }

    deleteCategory(request: DeleteCategoryRequest) {
        this.dispatchAction(this.quizActions.deleteCategoryAction(request));
    }

    getCategories() {
        this.dispatchAction(this.quizActions.getCategoriesAction());
    }

    addQuestion(request: AddQuestionRequest) {
        this.dispatchAction(this.quizActions.addQuestionAction(request));
    }

    getQuestions() {
        this.dispatchAction(this.quizActions.getQuestionsAction());
    }

}
