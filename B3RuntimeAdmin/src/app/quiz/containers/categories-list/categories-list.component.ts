import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterNGRXService } from 'app/core/store/router/app-router.service';
import { ActionState } from 'app/quiz/model/action-state.model';
import { Category } from 'app/quiz/model/category.model';
import { QuizStoreService } from 'app/quiz/store/quiz-store.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  categories$: Observable<Category[]>;
  getCategoriesActionState$: Observable<ActionState>;

  constructor(private quizStoreService: QuizStoreService,
    private routerService: RouterNGRXService) { }

  ngOnInit() {
    this.subscribeToStores();
  }

  ngOnDestroy(): void {
    this.stopAllSubscriptions();
  }

  private subscribeToStores() {
    this.categories$ = this.quizStoreService.selectCategories().takeUntil(this.ngUnsubscribe);
    this.getCategoriesActionState$ = this.quizStoreService.selectGetCategoriesActionState().takeUntil(this.ngUnsubscribe);
  }

  private stopAllSubscriptions() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onDeleteCategory(category: Category) {
    this.quizStoreService.deleteCategory({ category: category });
  }

  onShowQuestionsForCategory(category: Category) {
    this.routerService.routeToLocation(['/questions-list'], { filter: category.name })
  }
}
