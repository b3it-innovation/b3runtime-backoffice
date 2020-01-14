import { ActionState } from './../model/action-state.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Category } from 'app/quiz/model/category.model';
import { AppState } from 'app/store/app.state';
import { BasicStoreService } from 'app/store/basic-store.service';
import { Observable } from 'rxjs/Observable';
import { HappeningActions } from './happening.actions';
import { HappeningState } from './happening.state';


@Injectable()
export class HappeningStoreService extends BasicStoreService {
    protected readonly STATE = 'happening';

    constructor(
        protected store: Store<AppState>,
        private quizActions: HappeningActions
    ) {
        super();
    }

    // Fetching states from NGRX store
    selectAddCategoryActionState(): Observable<ActionState> {
        return null;
        // return this.storeSelectFeatureState().map((state: HappeningState) => state.loadingStates.addCategory);
    }

    selectAddHappeningActionState(): Observable<ActionState> {
        return this.storeSelectFeatureState().map((state: HappeningState) => state.loadingStates.addHappening);
    }

    // Sending events to NGRX store
    // addCategory(request: AddCategoryRequest) {
    //     this.dispatchAction(this.quizActions.addCategoryAction(request));
    // }
}
