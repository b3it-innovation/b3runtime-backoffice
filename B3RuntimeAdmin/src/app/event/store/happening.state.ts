
import { ActionState } from '../model/action-state.model';
import { Happening } from '../model/happening.model';
import { HappeningError } from '../model/happening-error.model';



export interface HappeningState {
    activHappening: Happening
    loadingStates: {
        addHappening: ActionState,
    },
    error: HappeningError
}

const actionStateInitialState: ActionState = {
    action: '',
    isLoading: false,
    isSuccess: false
}

export const happeningInitialState: HappeningState = {
    activHappening: {name: ''},
    loadingStates: {
        addHappening: actionStateInitialState,
      
    },
    error: null
}

