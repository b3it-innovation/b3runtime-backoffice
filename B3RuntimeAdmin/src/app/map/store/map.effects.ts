import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { RouterNGRXService } from 'app/core/store/router/app-router.service';
import { Observable } from 'rxjs/Observable';
import { MapActions } from './map.actions';
import { AddTrackRequest, AddControlPointRequest, AddControlPointsRequest } from '../payload/track';
import { MapService } from '../services/map.service';
import { Track } from '../model/track.model';
import { MapError } from '../model/map-error.model';
import { ControlPoint } from '../model/control-point.model';



@Injectable()
export class MapEffects {

  constructor(
    private actions$: Actions,
    private mapActions: MapActions,
    private mapService: MapService,
    private routerService: RouterNGRXService) { }

  // Categories
  @Effect()
  addTrack$: Observable<Action> = this.actions$
    .ofType(MapActions.Types.ADD_TRACK)
    .map(toPayload)
    .switchMap((data: AddTrackRequest) => this.mapService.addTrack(data.track)
      .map((response: Track) => this.mapActions.addTrackSuccessAction({ track: response }))
      .catch((error: MapError) => {
        error.action = MapActions.Types.ADD_TRACK;
        return Observable.of(this.mapActions.mapErrorAction(error));
      }));

  @Effect()
  addControlPoint$: Observable<Action> = this.actions$
    .ofType(MapActions.Types.ADD_CONTROLPOINT)
    .map(toPayload)
    .switchMap((data: AddControlPointRequest) => this.mapService.addControlPoint(data.controlPoint)
      .map((response: ControlPoint) => {
        return this.mapActions.addControlPointSuccessAction({ controlPoint: response })
      })
      .catch((error: MapError) => {
        error.action = MapActions.Types.ADD_CONTROLPOINT;
        return Observable.of(this.mapActions.mapErrorAction(error));
      }));


  @Effect()
  addControlPoints$: Observable<Action> = this.actions$
    .ofType(MapActions.Types.ADD_CONTROLPOINTS)
    .map(toPayload)
    .switchMap((data: AddControlPointsRequest) => this.mapService.addControlPoints(data.controlPoints)
      .map((response: ControlPoint[]) => {
        return this.mapActions.addControlPointsSuccessAction({ controlPoints: response })
      })
      .catch((error: MapError) => {
        error.action = MapActions.Types.ADD_CONTROLPOINTS;
        return Observable.of(this.mapActions.mapErrorAction(error));
      }));
}


