import { Injectable } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../../../store/app.state';
import * as RouterActions from './app-router.action';

@Injectable()
export class RouterNGRXService {

    constructor(
        private store: Store<AppState>
    ) { }

    routeToLocation(_path: any[], _query?: object, _extras?: NavigationExtras) {
        this.store.dispatch(new RouterActions.Go({
            path: _path,
            query: _query,
            extras: _extras
        }));
    }

    routeBack() {
        this.store.dispatch(new RouterActions.Back());
    }

    routeForward() {
        this.store.dispatch(new RouterActions.Forward());
    }
}
