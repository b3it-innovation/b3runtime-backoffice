import { Category } from './../../model/category.model';
import { Question } from './../../model/question.model';
import { Component, OnInit, Input } from '@angular/core';
import { RouterNGRXService } from '../../../core/store/router/app-router.service';
import { SelectQuestionRequest } from '../../payload/question';
import { QuizStoreService } from '../../store/quiz-store.service';

@Component({
  selector: 'app-question-item-list',
  templateUrl: './question-item-list.component.html',
  styleUrls: ['./question-item-list.component.scss']
})
export class QuestionItemListComponent {

  @Input()
  question: Question;
  @Input()
  categories: Category[];

  constructor(
    private quizStoreService: QuizStoreService,
    private routerService: RouterNGRXService) { }

  get categoriesForQuestion(): string[] {
    return this.categories
      .filter((category) => this.question.categories.includes(category.key))
      .map((item) => item.name);
  }

  onEditQuestion() {
    this.selectQuestion();
    this.routerService.routeToLocation(['/edit-question']);
  }

  private selectQuestion() {
    const request: SelectQuestionRequest = {question: this.question}
    // send payload to ngrx action
    this.quizStoreService.selectSelectQuestion(request);
  }
}

