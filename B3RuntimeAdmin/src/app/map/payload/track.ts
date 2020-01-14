import { Track } from "../model/track.model";
import { ControlPoint } from "../model/control-point.model";


export interface AddTrackRequest {
    track: Track
}
export interface AddTrackResponse {
    track: Track
}

export interface AddControlPointRequest {
    controlPoint: ControlPoint
}

export interface AddControlPointsResponse {
    controlPoints: ControlPoint[]
}

export interface AddControlPointsRequest {
    controlPoints: ControlPoint[]
}
export interface AddControlPointResponse {
    controlPoint: ControlPoint
}