import 'firebase/database';

import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

export function firebaseObservable(ref: firebase.database.Query, listenType = 'on'): Observable<any> {
    return Observable.create(observer => {
        const fn = function (snapshot: firebase.database.DataSnapshot) {
            observer.next(unwrapSnapshot(snapshot));
        };

        try {
            ref[listenType]('value', fn);
        } catch (error) {
            observer.error(error);
        }

        return () => ref.off('value', fn);
    })
}

function unwrapSnapshot(snapshot: firebase.database.DataSnapshot): any[] {
    const returnArr = [];
    snapshot.forEach(childSnapshot => {
        const item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
        return false;
    });

    return returnArr;
}

