import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HappeningFirebaseService } from './happening-firebase.service';
import { HappeningState } from '../store/happening.state';
import { Happening } from '../model/happening.model';
import { HappeningError } from '../model/happening-error.model';


@Injectable()
export class HappeningService {

    constructor(
        private fbService: HappeningFirebaseService,
        private store: Store<HappeningState>) {

    }

    addHappening(happening: Happening): Observable<Happening | HappeningError> {
        return this.fbService.addHappening(happening);
    }
}