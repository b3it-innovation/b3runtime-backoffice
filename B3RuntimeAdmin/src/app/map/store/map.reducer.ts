import { Action } from '@ngrx/store';
import * as routerActions from 'app/core/store/router/app-router.action';
import { mapInitialState, MapState } from './map.state';
import { MapActions } from './map.actions';


export function reducer(
  state = mapInitialState,
  action: Action & { payload?: any }): MapState {
    console.log(action.type);
  switch (action.type) {

    case MapActions.Types.ADD_TRACK: {
      return Object.assign({}, state, {
        loadingStates: Object.assign({}, state.loadingStates, {
          addTrack: {
            isLoading: true,
            isSuccess: false,
            action: MapActions.Types.ADD_TRACK
          }
        })
      })
    }

    case MapActions.Types.ADD_TRACK_SUCCESS: {
      state.activTrack =action.payload.track;
      return Object.assign({}, state, {
        loadingStates: Object.assign({}, state.loadingStates, {
          addTrack: {
            isLoading: false,
            isSuccess: true,
            action: MapActions.Types.ADD_TRACK
          }
        })
      })
    }

    case MapActions.Types.ADD_CONTROLPOINT: {
      return Object.assign({}, state, {
        loadingStates: Object.assign({}, state.loadingStates, {
          addControlPoint: {
            isLoading: true,
            isSuccess: false,
            action: MapActions.Types.ADD_CONTROLPOINT
          }
        })
      })
    }

    case MapActions.Types.ADD_CONTROLPOINT_SUCCESS: {
      state.controlPoints.push(action.payload.controlPoint);
      console.log(state.controlPoints.length)
     return Object.assign({}, state, {
        loadingStates: Object.assign({}, state.loadingStates, {
          addControlPoint: {
            isLoading: false,
            isSuccess: true,
            action: MapActions.Types.ADD_CONTROLPOINT
          }
        })
      })
    }

    case MapActions.Types.ADD_CONTROLPOINTS: {
      return Object.assign({}, state, {
        loadingStates: Object.assign({}, state.loadingStates, {
          addControlPoint: {
            isLoading: true,
            isSuccess: false,
            action: MapActions.Types.ADD_CONTROLPOINTS
          }
        })
      })
    }


    case MapActions.Types.ADD_CONTROLPOINTS_SUCCESS: {
      state.controlPoints = action.payload.controlPoints;
      console.log(state.controlPoints.length)
     return Object.assign({}, state, {
        loadingStates: Object.assign({}, state.loadingStates, {
          addControlPoint: {
            isLoading: false,
            isSuccess: true,
            action: MapActions.Types.ADD_CONTROLPOINTS
          }
        })
      })
    }

    case MapActions.Types.MAP_ERROR: {
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
        loadingStates: mapInitialState.loadingStates,
        error: mapInitialState.error,
      });
    }

    case routerActions.ActionTypes.BACK: {
      return Object.assign({}, state, {
        loadingStates: mapInitialState.loadingStates,
        error: mapInitialState.error,
      });
    }

    case routerActions.ActionTypes.FORWARD: {
      return Object.assign({}, state, {
        loadingStates: mapInitialState.loadingStates,
        error: mapInitialState.error,
      });
    }

  }
}
