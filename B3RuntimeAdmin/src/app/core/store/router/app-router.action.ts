import { NavigationExtras } from '@angular/router';
import { Action } from '@ngrx/store';
import { type } from 'app/core/store/util/util';

export const ActionTypes = {
    GO: type('[Router] Go'),
    BACK: type('[Router] Back'),
    FORWARD: type('[Router] Forward'),
}

export class Go implements Action {
    readonly type = ActionTypes.GO;

    constructor(public payload: {
        path: any[];
        query?: object;
        extras?: NavigationExtras;
    }) { 
    }
}

export class Back implements Action {
    readonly type = ActionTypes.BACK;
}

export class Forward implements Action {
    readonly type = ActionTypes.FORWARD;
}

export type Actions
    = Go
    | Back
    | Forward;
