import { ActionState } from '../model/action-state.model';
import { Question } from '../model/question.model';
import { Category } from './../model/category.model';
import { QuizError } from './../model/error.model';

export interface QuizState {
    draggedQuestion: Question;
    selectedQuestion: Question;
    questions: Question[];
    categories: Category[];
    loadingStates: {
        dragQuestion: ActionState,
        getCategories: ActionState,
        getQuestions: ActionState,
        addQuestion: ActionState,
        selectQuestion: ActionState,
        editQuestion: ActionState,
        addCategory: ActionState
    },
    error: QuizError
}

const actionStateInitialState: ActionState = {
    action: '',
    isLoading: false,
    isSuccess: false
}

const questionInitial: Question = {
    key: '',
    title: 'initial state ',
    options: [],
    correctAnswer: '',
    categories: []
}

export const quizInitialState: QuizState = {
    draggedQuestion: questionInitial,
    selectedQuestion: questionInitial,
    questions: [],
    categories: [],
    loadingStates: {
        dragQuestion: actionStateInitialState,
        getCategories: actionStateInitialState,
        getQuestions: actionStateInitialState,
        addQuestion: actionStateInitialState,
        selectQuestion: actionStateInitialState,
        editQuestion: actionStateInitialState,
        addCategory: actionStateInitialState
    },
    error: null
}

