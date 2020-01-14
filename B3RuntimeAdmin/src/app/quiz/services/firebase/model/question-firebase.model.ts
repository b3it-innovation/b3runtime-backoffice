import { QuestionOption } from 'app/quiz/model/option.model';

export interface QuestionFirebase {
    key: string,
    title: string,
    text?: string,
    imgUrl?: string,
    options: QuestionOption[],
    correctAnswer: string,
    categories?: any;
}
