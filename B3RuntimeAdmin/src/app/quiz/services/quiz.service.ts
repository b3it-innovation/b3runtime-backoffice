import { QuizError } from './../model/error.model';
import { Question } from '../model/question.model';
import { Category } from './../model/category.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { QuizFirebaseService } from 'app/quiz/services/quiz-firebase.service';
import { Observable } from 'rxjs/Observable';

import { QuizState } from '../store/quiz.state';
import { toPayload } from '@ngrx/effects';

@Injectable()
export class QuizService {
    constructor(
        private fbService: QuizFirebaseService,
    private store: Store<QuizState>,
) {

    }

    getCategories(): Observable<Category[] | QuizError | QuizError> {
        return this.fbService.getCategories();
    }

    addCategory(category: string): Observable<Category | QuizError> {
        return this.fbService.addCategory(category);
    }

    deleteCategory(category: Category): Observable<QuizError> {
        return this.fbService.deleteCategory(category.key);
    }

    getQuestions(): Observable<Question[] | QuizError> {
        //  var v = this.fbService.getQuestions();
       return this.fbService.getQuestions();
    }

    addQuestion(question: Question): Observable<Question | QuizError> {
        return this.fbService.addQuestion(question);
    }

    editQuestion(question: Question): Observable<Question | QuizError> {
        return this.fbService.editQuestion(question);
    }
    deleteQuestion(question: Question): Observable<QuizError> {
        return this.fbService.deleteQuestion(question.key);
    }
}
