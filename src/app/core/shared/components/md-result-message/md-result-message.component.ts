import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { grow } from 'app/core/shared/animations/router.animations';

@Component({
  selector: 'app-md-result-message',
  templateUrl: './md-result-message.component.html',
  styleUrls: ['./md-result-message.component.scss'],
  animations: [grow()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdResultMessageComponent implements OnInit {

  @Input() isSuccess;
  @Input() successMessage: string;
  @Input() isError;
  @Input() errorMessage: string;

  constructor() { }

  ngOnInit() {
  }

}
