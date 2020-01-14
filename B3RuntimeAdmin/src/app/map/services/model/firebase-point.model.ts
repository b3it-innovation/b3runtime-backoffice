import { MapLocation } from "../../model/map-location.model";

export interface FirebasePoint {
    key?: string,
    mapLocation: MapLocation,
    text?: string;
    questionKey?: string,
}