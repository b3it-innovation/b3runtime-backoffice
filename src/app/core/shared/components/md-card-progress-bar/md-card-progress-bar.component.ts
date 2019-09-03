import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-md-card-progress-bar',
  template:
  `<mat-card>
    <app-md-progress-bar-overlay [loading]="showLoading"></app-md-progress-bar-overlay>
    <ng-content></ng-content>
  </mat-card>`
})
export class MdCardProgressBarComponent {
  @Input() showLoading: boolean;
}
