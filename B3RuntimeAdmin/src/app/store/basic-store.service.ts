import { Store, Action } from '@ngrx/store';
import { AppState } from './app.state';


export abstract class BasicStoreService {
    protected readonly STATE;
    protected store: Store<AppState>;

    protected storeSelectFeatureState() {
        return this.store.select(this.STATE);
    }

    protected dispatchAction(action: Action) {
        this.store.dispatch(action);
    }
}
