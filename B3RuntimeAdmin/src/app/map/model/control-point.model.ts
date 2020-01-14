import { MapLocation } from "./map-location.model";
import { Question } from "../../quiz/model/question.model";
import { Track } from "./track.model";

export interface ControlPoint {
    key?: string,
    text?: string,
    mapLocation: MapLocation,
    questionKey?: string,
    orderInTrack?: number
  }