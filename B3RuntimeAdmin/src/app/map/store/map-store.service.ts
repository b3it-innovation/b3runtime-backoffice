import { Injectable } from "@angular/core";
import { BasicStoreService } from "../../store/basic-store.service";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.state";
import { MapActions } from "./map.actions";
import { Observable } from "rxjs/Observable";
import { MapState } from "./map.state";
import { AddTrackRequest, AddControlPointRequest, AddControlPointsRequest } from "../payload/track";
import { ActionState } from "app/map/model/action-state.model";
import { Track } from "../model/track.model";
import { ControlPoint } from "../model/control-point.model";
import { MapsEventListener } from "@agm/core/services/google-maps-types";

@Injectable()
export class MapStoreService extends BasicStoreService {
    protected readonly STATE = 'map';

    constructor(
        protected store: Store<AppState>,
        private mapActions: MapActions
    ) {
        super();
    }

    // Fetching states from NGRX store
    selectAddTrackActionState(): Observable<ActionState> {
        return this.storeSelectFeatureState().map((state: MapState) => state.loadingStates.addTrack);
    }

    selectTracks(): Observable<Track[]> {
        return this.storeSelectFeatureState().map((state: MapState) => state.tracks);
    }

    selectControlPoints(): Observable<ControlPoint[]> {
        return this.storeSelectFeatureState().map((state: MapState) => state.controlPoints);
    }

    // Sending events to NGRX store
    addTrack(request: AddTrackRequest) {
        this.dispatchAction(this.mapActions.addTrackAction(request));
    }

    addControlPoint(request: AddControlPointRequest){
        this.dispatchAction(this.mapActions.addControlPointAction(request))
    }

    addControlPoints(reqeust : AddControlPointsRequest){
        this.dispatchAction(this.mapActions.addControlPointsAction(reqeust))
    }
}
