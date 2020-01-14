import { QuestionOption } from 'app/quiz/model/option.model';

export interface Question {
    key: string,
    title: string,
    text?: string,
    imgUrl?: string,
    options: QuestionOption[],
    correctAnswer: string,
    categories: string[]
}
