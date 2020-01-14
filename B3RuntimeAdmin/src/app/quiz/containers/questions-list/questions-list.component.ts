import {
    Component,
    ComponentFactory,
    ComponentFactoryResolver,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewChildren,
    ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RouterNGRXService } from 'app/core/store/router/app-router.service';
import { QuestionListTableDataSource } from 'app/quiz/containers/questions-list/question-list-table-data-source';
import { ActionState } from 'app/quiz/model/action-state.model';
import { QuizStoreService } from 'app/quiz/store/quiz-store.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { QuestionItemListComponent } from '../../components/question-item-list/question-item-list.component';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  getQuestionsActionState$: Observable<ActionState>;

  displayedColumns = ['title', 'options', 'categories', 'remove'];
  dataSource: QuestionListTableDataSource | null;
  expandedRow: number;

  @ViewChild('filter') filter: ElementRef;
  @ViewChildren('myRow', { read: ViewContainerRef }) containers;

  constructor(private quizStoreService: QuizStoreService,
    private resolver: ComponentFactoryResolver,
    private routerService: RouterNGRXService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.subscribeToStores();
    this.extractQueryParametersFromUrl();
    this.setUpDataSourceAndFilter(); 
  }

  ngOnDestroy(): void {
    this.stopAllSubscriptions();
  }

  private subscribeToStores() {
    this.getQuestionsActionState$ = this.quizStoreService.selectGetQuestionsActionState().takeUntil(this.ngUnsubscribe);
  }

  private stopAllSubscriptions() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private extractQueryParametersFromUrl() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params['filter']) {
        this.filter.nativeElement.value = params['filter'];
      }
    });
  }

  private setUpDataSourceAndFilter() {
    this.defineTableDataSource();
    this.defineFilterFunction();
  }

  private defineTableDataSource() {
    this.dataSource = new QuestionListTableDataSource(this.quizStoreService);
    this.dataSource.filter = this.filter.nativeElement.value;
  }

  private defineFilterFunction() {
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  onGoBack() {
    this.routerService.routeBack();
  }

  onDeleteCategory(event) {
    this.quizStoreService.deleteCategory(event);
  }

  onExpandRow(index: number, row: any) {
    this.closeCurrentlyExpandedRow();
    this.expandRowWithNewComponent(index, row.key);

  }

  private closeCurrentlyExpandedRow() {
    if (this.expandedRow != null) {
      // clear old message
      this.containers.toArray()[this.expandedRow].clear();
    }
  }

  private expandRowWithNewComponent(index: number, key: string) {
    if (this.expandedRow === index) {
      this.expandedRow = null;
    } else {
      const container = this.containers.toArray()[index];
      const factory: ComponentFactory<QuestionItemListComponent> = this.resolver.resolveComponentFactory(QuestionItemListComponent);
      const messageComponent = container.createComponent(factory);

      this.expandedRow = index;

      messageComponent.instance.question = this.dataSource.getQuestionWithKey(key);
      messageComponent.instance.categories = this.dataSource.getCategories();
    }
  }
}
