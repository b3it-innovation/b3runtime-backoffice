import { Action } from '@ngrx/store';
import * as routerActions from 'app/core/store/router/app-router.action';
import { happeningInitialState, HappeningState } from './happening.state';
import { HappeningActions } from './happening.actions';


export function reducer(
  state = happeningInitialState,
  action: Action & { payload?: any }): HappeningState {
    console.log(action.type);
  switch (action.type) {

    case HappeningActions.Types.ADD_HAPPENING: {
      return Object.assign({}, state, {
        loadingStates: Object.assign({}, state.loadingStates, {
          addTrack: {
            isLoading: true,
            isSuccess: false,
            action: HappeningActions.Types.ADD_HAPPENING
          }
        })
      })
    }

    case HappeningActions.Types.ADD_HAPPENING_SUCCESS: {
      state.activHappening =action.payload.happening;
      return Object.assign({}, state, {
        loadingStates: Object.assign({}, state.loadingStates, {
          addTrack: {
            isLoading: false,
            isSuccess: true,
            action: HappeningActions.Types.ADD_HAPPENING
          }
        })
      })
    }



    case HappeningActions.Types.HAPPENING_ERROR: {
      return Object.assign({}, state, {
        error: action.payload
      })
    }

    default: {
      return state;
    }

    // Remove errors when navigating between Auth pages
    case routerActions.ActionTypes.GO: {
      return Object.assign({}, state, {
        loadingStates: happeningInitialState.loadingStates,
        error: happeningInitialState.error,
      });
    }

    case routerActions.ActionTypes.BACK: {
      return Object.assign({}, state, {
        loadingStates: happeningInitialState.loadingStates,
        error: happeningInitialState.error,
      });
    }

    case routerActions.ActionTypes.FORWARD: {
      return Object.assign({}, state, {
        loadingStates: happeningInitialState.loadingStates,
        error: happeningInitialState.error,
      });
    }

  }
}
