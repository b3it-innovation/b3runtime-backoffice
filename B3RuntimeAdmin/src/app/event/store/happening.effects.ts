import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { RouterNGRXService } from 'app/core/store/router/app-router.service';
import { Observable } from 'rxjs/Observable';
import { HappeningActions } from './happening.actions';
import { HappeningService } from '../services/happening.service';
import { AddHappeningRequest } from '../payload/happening';
import { Happening } from '../model/happening.model';
import { HappeningError } from '../model/happening-error.model';




@Injectable()
export class HappeningEffects {

  constructor(
    private actions$: Actions,
    private happeningActions: HappeningActions,
    private happeningService: HappeningService,
    private routerService: RouterNGRXService) { }

  // Categories
  @Effect()
  addTrack$: Observable<Action> = this.actions$
    .ofType(HappeningActions.Types.ADD_HAPPENING)
    .map(toPayload)
    .switchMap((data: AddHappeningRequest) => this.happeningService.addHappening(data.happening)
      .map((response: Happening) => this.happeningActions.addHappeningSuccessAction({ happening: response }))
      .catch((error: HappeningError) => {
        error.action = HappeningActions.Types.ADD_HAPPENING;
        return Observable.of(this.happeningActions.happeningErrorAction(error));
      }));
}


