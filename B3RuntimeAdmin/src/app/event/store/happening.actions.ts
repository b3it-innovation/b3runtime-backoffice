
import { Injectable } from '@angular/core';
import { ActionCreator } from 'app/core/store/util/action-creator';
import { type } from 'app/core/store/util/util';
import { AddHappeningRequest, AddHappeningResponse } from '../payload/happening';
import { HappeningError } from '../model/happening-error.model';


@Injectable()
export class HappeningActions {

    static Types = {

        ADD_HAPPENING: type('[Happening] -ADD_HAPPENING Requested-'),
        ADD_HAPPENING_SUCCESS: type('[Happening] -ADD_HAPPENING Success-'),

        HAPPENING_ERROR: type('[Happening] -Happening Error-')

    }


     addHappeningAction = ActionCreator.create<AddHappeningRequest>(HappeningActions.Types.ADD_HAPPENING);
     addHappeningSuccessAction = ActionCreator.create<AddHappeningResponse>(HappeningActions.Types.ADD_HAPPENING_SUCCESS);

     happeningErrorAction = ActionCreator.create<HappeningError>(HappeningActions.Types.HAPPENING_ERROR);

}
