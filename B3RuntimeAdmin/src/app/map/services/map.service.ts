import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { MapFirebaseService } from './map-firebase.service';
import { MapState } from '../store/map.state';
import { MapError } from '../model/map-error.model';
import { Observable } from 'rxjs/Observable';
import { Track } from '../model/track.model';
import { ControlPoint } from '../model/control-point.model';

@Injectable()
export class MapService {

    constructor(
        private fbService: MapFirebaseService,
        private store: Store<MapState>) {

    }
    addTrack(track: Track): Observable<Track | MapError> {
        return this.fbService.addTrack(track);
    }

    getTracks(): Observable<Track[] | MapError> {
        return this.fbService.getTracks();
    }

    addControlPoint(controlPoint: ControlPoint) {
        return this.fbService.addControlPoint(controlPoint);
    }

    addControlPoints(controlPoints: ControlPoint[]){
        return this.fbService.addControlPoints(controlPoints);
    }

    generateUniqueId(): string {
        return this.fbService.generateUniqueId();
    }
}