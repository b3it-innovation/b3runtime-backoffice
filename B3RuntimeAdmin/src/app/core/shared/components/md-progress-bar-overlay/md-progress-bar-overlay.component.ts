import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-md-progress-bar-overlay',
  template:
  `<div *ngIf="loading">
    <mat-progress-bar class="progress-bar-loading" mode="indeterminate"></mat-progress-bar>
    <div class="progress-bar-overlay"></div>
  </div>`,
  styles: [`.progress-bar-loading {
    position: absolute;
    margin: 0;
    top: 0px;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .progress-bar-overlay {
    background: hsla(0, 0%, 100%, .8);
    position: absolute;
    margin: 0;
    top: 5px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
  }
  `]
})
export class MdProgressBarOverlayComponent {
  @Input() loading: boolean;
}
