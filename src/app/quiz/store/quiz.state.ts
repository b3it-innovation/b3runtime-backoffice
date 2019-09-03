import { ActionState } from '../model/action-state.model';
import { Question } from '../model/question.model';
import { Category } from './../model/category.model';
import { QuizError } from './../model/error.model';

export interface QuizState {
    questions: Question[];
    categories: Category[];
    loadingStates: {
        getCategories: ActionState,
        getQuestions: ActionState,
        addQuestion: ActionState,
        addCategory: ActionState
    },
    error: QuizError
}

const actionStateInitialState: ActionState = {
    action: '',
    isLoading: false,
    isSuccess: false
}

export const quizInitialState: QuizState = {
    questions: [],
    categories: [],
    loadingStates: {
        getCategories: actionStateInitialState,
        getQuestions: actionStateInitialState,
        addQuestion: actionStateInitialState,
        addCategory: actionStateInitialState
    },
    error: null
}

