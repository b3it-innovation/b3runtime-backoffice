import 'firebase/database';
import 'firebase/storage';

import { Category } from 'app/quiz/model/category.model';
import { Question } from 'app/quiz/model/question.model';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

import { firebaseObservable } from '../../core/shared/firebase/firebase-observable';
import { QuizError } from './../model/error.model';
import { QuestionFirebase } from './firebase/model/question-firebase.model';


export class QuizFirebaseService {

    // categories
    getCategories(): Observable<Category[] | QuizError> {
        return firebaseObservable(firebase.database().ref('categories'), 'once')
            .switchMap((data) => Observable.of(data))
            .catch((error: firebase.FirebaseError) => Observable.throw(this.mapToQuizError(error)));
    }

    addCategory(category: string): Observable<Category | QuizError> {
        const key = this.generateUniqueId();
        return Observable.fromPromise(firebase.database().ref('categories').child(key).set({ name: category }))
            .switchMap(() => Observable.of({ name: category, key: key }))
            .catch((error: firebase.FirebaseError) => Observable.throw(this.mapToQuizError(error)));
    }

    deleteCategory(key: string): Observable<QuizError> {
        return Observable.fromPromise(firebase.database().ref('categories').child(key).remove())
            .catch((error: firebase.FirebaseError) => Observable.throw(this.mapToQuizError(error)));
    }

    // questions
    getQuestions(): Observable<Question[] | QuizError> {
     return   firebaseObservable(firebase.database().ref('questions'), 'once')
            .map((data: any[]) => data.map((item) => this.mapFromQuestionFirebasModelToQuestionModel(item)))
            .switchMap((data: any[]) => Observable.of(data))
            .catch((error: firebase.FirebaseError) => Observable.throw(this.mapToQuizError(error)));
    }

    addQuestion(question: Question): Observable<Question | QuizError> {
        const key = this.generateUniqueId();
        return Observable.fromPromise(firebase.database().ref('questions').child(key)
            .set(this.mapFromQuestionModelToQuestionFirebaseModel(question))
            .then(() => {
                question.categories.forEach((category) => {
                    console.log('1');
                    firebase.database().ref('/categories/' + category + '/questions/').once('value', function (snapshot) {
                        snapshot.ref.update({ [key]: true });
                    });
                })
            }))
            .switchMap(() => { console.log('2ssss'); return Observable.of(question) })
            .catch((error: firebase.FirebaseError) => Observable.throw(this.mapToQuizError(error)));

    }

    updateCategoriesWithQuestions(question, key) {
        question.categories.forEach((category) => {
            console.log('1');
            firebase.database().ref('/categories/' + category + '/questions/').once('value', function (snapshot) {
                snapshot.ref.update({ [key]: true });
            });
        })
    }

    deleteQuestion(key: string): Observable<QuizError> {
        return Observable.fromPromise(firebase.database().ref('questions').child(key).remove())
            .switchMap((data) => Observable.of(data))
            .catch((error: firebase.FirebaseError) => Observable.throw(this.mapToQuizError(error)));
    }



    mapToQuizError(error: firebase.FirebaseError): QuizError {
        return {
            code: error.code,
            message: error.message,
        }
    }

    mapFromQuestionModelToQuestionFirebaseModel(question: Question): QuestionFirebase {
        const questionFirebase: QuestionFirebase = {
            key: question.key,
            title: question.title,
            text: question.text,
            imgUrl: question.imgUrl,
            options: question.options,
            correctAnswer: question.correctAnswer,
            categories: this.mapCategoriesArrayToDictionary(question.categories)
        }

        return questionFirebase;
    }

    mapFromQuestionFirebasModelToQuestionModel(questionFirebase: QuestionFirebase): Question {
        const question: Question = {
            key: questionFirebase.key,
            title: questionFirebase.title,
            text: questionFirebase.text,
            imgUrl: questionFirebase.imgUrl,
            options: questionFirebase.options,
            correctAnswer: questionFirebase.correctAnswer,
            categories:[]
            //TODO logiken kring categories fungerar inte som den ska
           //categories: this.mapCategoriesDictionaryToArray(questionFirebase.categories)
        }
        return question;
    }

    mapCategoriesArrayToDictionary(categories: string[]): { [id: string]: boolean } {
        const result: { [id: string]: boolean } = {};
        categories.forEach((item: string) => {
            result[item] = true;
        })
        return result;
    }

    mapCategoriesDictionaryToArray(categories: { [id: string]: boolean }): string[] {
        return Object.keys(categories);
    }

    generateUniqueId(): string {
        return firebase.database().ref().push().key;
    }

}
