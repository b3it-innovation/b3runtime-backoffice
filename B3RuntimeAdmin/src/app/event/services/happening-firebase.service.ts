
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase/app';
import { firebaseObservable } from '../../core/shared/firebase/firebase-observable';
import { ControlPoint } from "../../map/model/control-point.model";
import { Happening } from "../model/happening.model";
import { Attendee } from "../model/attendee.model";
import { HappeningTrack } from "../model/happening-track.model";
import { HappeningAttendees } from "../model/happening-attendees";
import { HappeningError } from "../model/happening-error.model";

export class HappeningFirebaseService {
    rootRef = firebase.database().ref();

    addHappening(happening: Happening): Observable<Happening | HappeningError> {
        const key = this.generateUniqueId();
        return Observable.fromPromise(firebase.database().ref('happenings').child(key)
            .set(happening))
            .switchMap(() => { console.log('save happening'); return Observable.of(happening) })
            .catch((error: firebase.FirebaseError) => Observable.throw(null));
    }

    addAttendee(attendee: Attendee) {
        const key = this.generateUniqueId();
        return Observable.fromPromise(firebase.database().ref('attendees').child(key)
            .set(attendee))
            .switchMap(() => { console.log('save attendee'); return Observable.of(attendee) })
            .catch((error: firebase.FirebaseError) => Observable.throw(this.mapToHappeningError(error)));
    }


    addHappeningTrack(happeningTrack: HappeningTrack) {
        const key = this.generateUniqueId();
        return Observable.fromPromise(firebase.database().ref('happenings-tracks').child(key)
            .set(happeningTrack))
            .switchMap(() => { console.log('save happening track'); return Observable.of(happeningTrack) })
            .catch((error: firebase.FirebaseError) => Observable.throw(this.mapToHappeningError(error)));
    }

    addHappeningAttendees(happeningAttendees: HappeningAttendees) {
        return Observable.fromPromise(firebase.database().ref('happening-attendees').child(happeningAttendees.happeningKey)
            .set(happeningAttendees))
            .switchMap(() => { console.log('save happening attendees'); return Observable.of(happeningAttendees) })
            .catch((error: firebase.FirebaseError) => Observable.throw(this.mapToHappeningError(error)));
    }

    happeningToMapError(error: firebase.FirebaseError): HappeningError {
        return {
            code: error.code,
            message: error.message,
        }
    }

    generateUniqueId(): string {
        return firebase.database().ref().push().key;
    }

    mapToHappeningError(error: firebase.FirebaseError): HappeningError {
        return {
            code: error.code,
            message: error.message,
        }
    }
}
