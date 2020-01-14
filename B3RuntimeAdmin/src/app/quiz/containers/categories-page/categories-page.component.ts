import { Component, OnInit } from '@angular/core';
import { RouterNGRXService } from 'app/core/store/router/app-router.service';
import { QuizStoreService } from 'app/quiz/store/quiz-store.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {

  constructor(
    private routerService: RouterNGRXService,
    private quizStoreService: QuizStoreService) { }

  ngOnInit() {
    this.quizStoreService.getCategories();
  }

  onGoBack() {
    this.routerService.routeBack();
  }

}
