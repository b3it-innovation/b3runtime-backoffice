import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-md-progress-spinner-overlay',
  template:
  `<div *ngIf="loading" align="center">
    <mat-spinner class="progress-spinner-loading" mode="indeterminate"></mat-spinner>
    <div class="progress-spinner-overlay"></div>
  </div>`,
  styles: [`.progress-spinner-loading {
    position: relative;
    margin: 0;
    top: 0px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1001;
  }
  .progress-spinner-overlay {
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

export class MdProgressSpinnerOverlayComponent {

  @Input() loading: boolean;

}




