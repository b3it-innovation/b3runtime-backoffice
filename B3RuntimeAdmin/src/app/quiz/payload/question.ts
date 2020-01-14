import { Question } from '../model/question.model';

export interface AddQuestionRequest {
    question: Question
}

export interface AddQuestionResponse {
    question: Question
}

export interface SelectQuestionRequest {
    question: Question
}

export interface SelectQuestionResponse {
    question: Question
}

export interface EditQuestionRequest {
    question: Question
}

export interface DragQuestionRequest {
    question: Question
}

export interface EditQuestionResponse {
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

export interface DropQuestionResponse {
    question: Question
}
