import { Component, OnInit } from '@angular/core';
import { RouterNGRXService } from 'app/core/store/router/app-router.service';

@Component({
  selector: 'app-quiz-overview',
  templateUrl: './quiz-overview.component.html',
  styleUrls: ['./quiz-overview.component.scss']
})
export class QuizOverviewComponent implements OnInit {

  constructor(private routerService: RouterNGRXService) { }

  ngOnInit() {
  }

  onGoBack() {
    this.routerService.routeBack();
  }

  onGoToCategories() {
    this.routerService.routeToLocation(['/categories']);
  }

  onGoToQuestions() {
    this.routerService.routeToLocation(['/questions-list']);
  }

  onCreateQuestion() {
    this.routerService.routeToLocation(['/create-question']);
  }

}
