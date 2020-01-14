
import { Injectable } from '@angular/core';
import { ActionCreator } from 'app/core/store/util/action-creator';
import { type } from 'app/core/store/util/util';
import { MapError } from '../model/map-error.model';
import { AddTrackRequest, AddTrackResponse, AddControlPointRequest, AddControlPointResponse, AddControlPointsRequest, AddControlPointsResponse } from '../payload/track';


@Injectable()
export class MapActions {

    static Types = {
        ADD_TRACK: type('[Map] -ADD_TRACK Requested-'),
        ADD_TRACK_SUCCESS: type('[Map] -ADD_TRACK Success-'),
        ADD_CONTROLPOINT: type('[Map] -ADD_CONTROLPOINT Requested-'),
        ADD_CONTROLPOINT_SUCCESS: type('[Map] -ADD_CONTROLPOINT Success-'),
        ADD_CONTROLPOINTS: type('[Map] -ADD_CONTROLPOINTS Requested-'),
        ADD_CONTROLPOINTS_SUCCESS: type('[Map] -ADD_CONTROLPOINTS Success-'),
        MAP_ERROR: type('[Map] -Map Error-')

    }

    addTrackAction = ActionCreator.create<AddTrackRequest>(MapActions.Types.ADD_TRACK);
    addTrackSuccessAction = ActionCreator.create<AddTrackResponse>(MapActions.Types.ADD_TRACK_SUCCESS)
    addControlPointAction = ActionCreator.create<AddControlPointRequest>(MapActions.Types.ADD_CONTROLPOINT);
    addControlPointSuccessAction = ActionCreator.create<AddControlPointResponse>(MapActions.Types.ADD_CONTROLPOINT_SUCCESS)
    addControlPointsAction = ActionCreator.create<AddControlPointsRequest>(MapActions.Types.ADD_CONTROLPOINTS);
    addControlPointsSuccessAction = ActionCreator.create<AddControlPointsResponse>(MapActions.Types.ADD_CONTROLPOINTS_SUCCESS)
    mapErrorAction = ActionCreator.create<MapError>(MapActions.Types.MAP_ERROR);
}
