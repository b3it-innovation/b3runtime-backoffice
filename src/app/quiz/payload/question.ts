import { Question } from '../model/question.model';

export interface AddQuestionRequest {
    question: Question
}

export interface AddQuestionResponse {
    question: Question
}

export interface DeleteQuestionRequest {
    question: Question
}

export interface DeleteQuestionResponse {
    question: Question
}

export interface GetQuestionsResponse {
    questions: Question[]
}
