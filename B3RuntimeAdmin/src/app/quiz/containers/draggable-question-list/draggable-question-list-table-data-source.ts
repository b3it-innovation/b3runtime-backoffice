// import { Category } from 'app/quiz/model/category.model';
// import { Question } from 'app/quiz/model/question.model';
// import { QuizStoreService } from 'app/quiz/store/quiz-store.service';
// import { Observable } from 'rxjs/Observable';

// import { TableDataSourceFilter } from '../../../core/shared/utils/table-data-source-filter';
// import { OnInit } from '@angular/core';


// export class DDraggableQuestionListTableDataSource extends TableDataSourceFilter implements OnInit{

//     defineOriginalDataSetObservable(): Observable<any[]> {
//         throw new Error("Method not implemented.");
//     }
//     filteredDataSet(): any[] {
//         throw new Error("Method not implemented.");
//     }
//     ngOnInit(): void {
    
//     }
// }

//     // // defineOriginalDataSetObservable(): Observable<any[]> {
//     // //     return this.quizStoreService.selectQuestions().takeUntil(this.ngUnsubscribe);
//     // // }

//     // filteredDataSet(): any[] {
//     //     return this.filterQuestionListContainingFilteredCategories();
//     // }

//     // private subscribeToStores() {
//     //     this.quizStoreService.selectCategories().takeUntil(this.ngUnsubscribe)
//     //         .subscribe((categoriesFromStore) => this.categories = categoriesFromStore);

//     //     this.quizStoreService.selectQuestions().takeUntil(this.ngUnsubscribe)
//     //         .subscribe((questionsFromStore) => this.questions = questionsFromStore);
//     // }

//     // public getQuestionWithKey(key: string): Question {
//     //     return this.questions.filter((question) => (question.key === key))[0];
//     // }

//     // public getCategories(): Category[] {
//     //     return this.categories;
//     // }

//     // private filterQuestionListContainingTitle() {
//     //     return this.questions.filter(question => (question.title.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1));
//     // }

//     // private filterQuestionListContainingFilteredCategories() {
//     //     //TODO denna filtrering behöver ses över
//     //     const filteredCategories = this.filteredCategories();
        
//     //     //Dennna filterering ska tillbaka när jag fattat fireBase
//     //     // this.questions = this.questions.filter((question) =>
//     //     //     question.categories.some(category => filteredCategories.indexOf(category) >= 0)
//     //     // );
        
        
//     //     return this.questions;
//     // }

//     // private filteredCategories(): string[] {
//     //     return this.mapCategoryNameToCategoryKeyFromFilter();
//     // }

//     // private mapCategoryNameToCategoryKeyFromFilter(): string[] {
//     //     return this.categories
//     //         .filter(category => this.sourceStringContainsPartsOfTargetString(category.name, this.filter))
//     //         .map(filteredCategory => filteredCategory.key);
//     // }

//     // private sourceStringContainsPartsOfTargetString(source: string, target: string): boolean {
//     //     return source.toLowerCase().includes(target.toLowerCase());
//     // }

