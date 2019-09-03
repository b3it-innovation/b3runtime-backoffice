import { QuizError } from '../model/error.model';
import { Injectable } from '@angular/core';
import { ActionCreator } from 'app/core/store/util/action-creator';
import { type } from 'app/core/store/util/util';

import {
    AddCategoryRequest,
    AddCategoryResponse,
    DeleteCategoryRequest,
    DeleteCategoryResponse,
    GetCategoriesResponse,
} from './../payload/category';
import { AddQuestionRequest, AddQuestionResponse, DeleteQuestionRequest, GetQuestionsResponse } from './../payload/question';

@Injectable()
export class QuizActions {

    static Types = {
        ADD_CATEGORY: type('[Quiz] -ADD_CATEGORY Requested-'),
        ADD_CATEGORY_SUCCESS: type('[Quiz] -ADD_CATEGORY Success-'),

        DELETE_CATEGORY: type('[Quiz] -DELETE_CATEGORY Requested-'),
        DELETE_CATEGORY_SUCCESS: type('[Quiz] -DELETE_CATEGORY Success-'),

        GET_CATEGORIES: type('[Quiz] -GET_CATEGORIES Requested-'),
        GET_CATEGORIES_SUCCESS: type('[Quiz] -GET_CATEGORIES Success-'),

        ADD_QUESTION: type('[Quiz] -ADD_QUESTION Requested-'),
        ADD_QUESTION_SUCCESS: type('[Quiz] -ADD_QUESTION Success-'),

        DELETE_QUESTION: type('[Quiz] -DELETE_QUESTION Requested-'),
        DELETE_QUESTION_SUCCESS: type('[Quiz] -DELETE_QUESTION Success-'),

        GET_QUESTIONS: type('[Quiz] -GET_QUESTIONS Requested-'),
        GET_QUESTIONS_SUCCESS: type('[Quiz] -GET_QUESTIONS Success-'),

        QUIZ_ERROR: type('[Quiz] -Quiz Error-')

    }

    addCategoryAction = ActionCreator.create<AddCategoryRequest>(QuizActions.Types.ADD_CATEGORY);
    addCategorySuccessAction = ActionCreator.create<AddCategoryResponse>(QuizActions.Types.ADD_CATEGORY_SUCCESS)

    deleteCategoryAction = ActionCreator.create<DeleteCategoryRequest>(QuizActions.Types.DELETE_CATEGORY);
    deleteCategorySuccessAction = ActionCreator.create<DeleteCategoryResponse>(QuizActions.Types.DELETE_CATEGORY_SUCCESS)

    getCategoriesAction = ActionCreator.create(QuizActions.Types.GET_CATEGORIES);
    getCategoriesSuccessAction = ActionCreator.create<GetCategoriesResponse>(QuizActions.Types.GET_CATEGORIES_SUCCESS);

    addQuestionAction = ActionCreator.create<AddQuestionRequest>(QuizActions.Types.ADD_QUESTION);
    addQuestionSuccessAction = ActionCreator.create<AddQuestionResponse>(QuizActions.Types.ADD_QUESTION_SUCCESS);

    deleteQuestionAction = ActionCreator.create<DeleteQuestionRequest>(QuizActions.Types.ADD_QUESTION);
    deleteQuestionSuccessAction = ActionCreator.create<DeleteQuestionRequest>(QuizActions.Types.ADD_QUESTION_SUCCESS);

    getQuestionsAction = ActionCreator.create(QuizActions.Types.GET_QUESTIONS);
    getQuestionsSuccessAction = ActionCreator.create<GetQuestionsResponse>(QuizActions.Types.GET_QUESTIONS_SUCCESS);

    quizErrorAction = ActionCreator.create<QuizError>(QuizActions.Types.QUIZ_ERROR);

}
