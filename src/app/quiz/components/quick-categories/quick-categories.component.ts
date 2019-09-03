import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Category } from 'app/quiz/model/category.model';
import { QuizStoreService } from 'app/quiz/store/quiz-store.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-quick-categories',
  templateUrl: './quick-categories.component.html',
  styleUrls: ['./quick-categories.component.scss']
})
export class QuickCategoriesComponent implements OnInit, OnDestroy {

  // input to the component
  @Input() set selectedCategories(tags: Category[]) {
    this.selectedCategoriesName = tags.map((item) => item.name);
  }
  // handles the output
  @Output() addCategory = new EventEmitter<Category>();
  @Output() removeCategory = new EventEmitter<Category>();

  allCategories: Category[];
  allCategoriesName: string[];
  selectedCategoriesName: string[];

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private quizStoreService: QuizStoreService) { }

  ngOnInit() {
    this.quizStoreService.getCategories();
    this.subscribeToStores();
  }

  ngOnDestroy(): void {
    this.stopAllSubscriptions();
  }

  onAddCategory(value: string) {
    this.addCategory.emit(this.getCategory(value));
  }

  onRemoveCategory(value: string) {
    this.removeCategory.emit(this.getCategory(value));
  }

  private subscribeToStores() {
    this.quizStoreService.selectCategories().takeUntil(this.ngUnsubscribe).subscribe((data) => {
      this.allCategories = data;
      this.allCategoriesName = data.map((item) => item.name);
    });
  }

  private stopAllSubscriptions() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private getCategory(name: string): Category {
    let category: Category = this.findCategoryByName(name);

    if (!this.isCategorySet(category)) {
      category = this.createCategoryObject(name);
    }

    return category;
  }

  private findCategoryByName(name: string): Category {
    return this.allCategories.filter((item) => (item.name === name))[0];
  }

  private createCategoryObject(value: string): Category {
    return {
      key: '',
      name: value
    }
  }

  private isCategorySet(category: Category): boolean {
    return category ? true : false;
  }

}
