import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-td-data-table-progress-bar',
  template:
  `<ng-template tdLoading [tdLoadingUntil]="showLoading" tdLoadingStrategy="overlay">
    <table td-data-table>
      <ng-content></ng-content>
    </table>
  </ng-template>`
})
export class TdDataTableProgressBarComponent {
  @Input() showLoading: boolean;
}
