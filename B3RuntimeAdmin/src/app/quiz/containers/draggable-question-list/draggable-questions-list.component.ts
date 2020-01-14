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
import { DataSource } from '@angular/cdk/table';
import { Question } from '../../model/question.model';
import { Category } from '../../model/category.model';
import { DragQuestionRequest } from '../../payload/question';

@Component({
  selector: 'app-draggable-questions-list',
  templateUrl: './draggable-questions-list.component.html',
  styleUrls: ['./draggable-questions-list.component.scss']
})
export class DrabbagleQuestionsListComponent implements OnInit, OnDestroy {

  questions: Question[];
  categories: Category[];
  
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  getQuestionsActionState$: Observable<ActionState>;

  displayedColumns = ['title'];
 

  @ViewChild('filter') filter: ElementRef;


  constructor(private quizStoreService: QuizStoreService,
    private resolver: ComponentFactoryResolver,
    private routerService: RouterNGRXService,
    private activatedRoute: ActivatedRoute
   ) {
    this.quizStoreService.getQuestions();
    this.quizStoreService.getCategories();
    }

  ngOnInit() {
    this.subscribeToStores();
    this.extractQueryParametersFromUrl();
    this.setUpDataSourceAndFilter();  
  }

  onDragStart(event, dragQuestion) {
    const request: DragQuestionRequest = {
      question: dragQuestion
    }
    this.quizStoreService.dragQuestion(request)
    event.dataTransfer.setData('data', dragQuestion); 
  }

 

  ngOnDestroy(): void {
    this.stopAllSubscriptions();
  }
  
 
  mapValueToQuestion(value: string) : Question{
   return this.questions.find(question => question.title == value);
  }


    private subscribeToStores() {
      this.quizStoreService.selectCategories().takeUntil(this.ngUnsubscribe)
          .subscribe((categoriesFromStore) => this.categories = categoriesFromStore);

      this.quizStoreService.selectQuestions().takeUntil(this.ngUnsubscribe)
          .subscribe((questionsFromStore) => this.questions = questionsFromStore);

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
    this.defineFilterFunction();
  }

  
  private defineFilterFunction() {
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        this.filter = this.filter.nativeElement.value;
      });
      }
}
