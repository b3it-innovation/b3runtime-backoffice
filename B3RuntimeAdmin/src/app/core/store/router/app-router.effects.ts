import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';

import * as RouterActions from './app-router.action';

@Injectable()
export class RouterEffects {
    @Effect({ dispatch: false })
    navigate$ = this.actions$.ofType(RouterActions.ActionTypes.GO)
        .map((action: RouterActions.Go) => action.payload)
        .do(({ path, query: queryParams, extras }) => this.router.navigate(path, { queryParams, ...extras }));

    @Effect({ dispatch: false })
    navigateBack$ = this.actions$.ofType(RouterActions.ActionTypes.BACK)
        .do(() => this.location.back());

    @Effect({ dispatch: false })
    navigateForward$ = this.actions$.ofType(RouterActions.ActionTypes.FORWARD)
        .do(() => this.location.forward());

    constructor(
        private actions$: Actions,
        private router: Router,
        private location: Location
    ) { }
}
