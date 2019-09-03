import { Category } from './../../model/category.model';
import { Question } from './../../model/question.model';
import { Component, OnInit, Input } from '@angular/core';

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

  get categoriesForQuestion(): string[] {
    return this.categories
      .filter((category) => this.question.categories.includes(category.key))
      .map((item) => item.name);
  }

  onEditQuestion() {

  }

}
