import { MapError } from "../model/map-error.model";
import { ActionState } from "../model/action-state.model";
import { ControlPoint } from "../model/control-point.model";
import { Track } from "../model/track.model";


export interface MapState {
    controlPoints: ControlPoint[],
    activTrack: Track,
    tracks: Track[],
    loadingStates: {
        addTrack: ActionState,
        addControlPoint: ActionState,
        addControlPoints: ActionState
    },
    error: MapError
}

const actionStateInitialState: ActionState = {
    action: '',
    isLoading: false,
    isSuccess: false
}

const activTrackInitialState: Track = {
    name: ''
}

export const mapInitialState: MapState = {
    controlPoints: [],
    activTrack: activTrackInitialState,
    tracks: [],
    loadingStates: {
        addTrack: actionStateInitialState,
        addControlPoint: actionStateInitialState,
        addControlPoints: actionStateInitialState
    },
    error: null
}



