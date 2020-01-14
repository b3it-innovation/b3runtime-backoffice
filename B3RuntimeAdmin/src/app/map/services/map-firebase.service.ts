
import { Observable } from "rxjs/Observable";
import { MapError } from "../model/map-error.model";
import * as firebase from 'firebase/app';
import { firebaseObservable } from '../../core/shared/firebase/firebase-observable';
import { Track } from "../model/track.model";
import { ControlPoint } from "../model/control-point.model";
import { FirebasePoint } from "./model/firebase-point.model";
import { FirebaseTrack } from "./model/firebase-track.model";
import { ControlPoint_Question } from "./model/firebase-control-point-question.model";


export class MapFirebaseService {
    rootRef = firebase.database().ref();
    // tracks
    getTracks(): Observable<Track[] | MapError> {
        //   const happy =  this.rootRef.child('tracks');
        //   happy.on('child_added', snap => {
        //       console.log(snap.val())
        //       console.log('tracks/'+snap.val()+ 'categoryKeys/-L9AQ1z_hJQ-3Yjt5Mug');
        //       let trackRef = this.rootRef.child('tracks/'+snap.val()+ 'categoryKeys/-L9AQ1z_hJQ-3Yjt5Mug');
        //       trackRef.once('value').then(trackSnap => {
        //           console.log(trackSnap.val());
        //       })
        //   })
        //     console.log('detta måste ju köras ');
        //    // console.log(tracks);

        //     return   firebaseObservable(firebase.database().ref('tracks'), 'once')
        //         .map((data: any[]) => {
        //             console.log(data);
        //            return data.map((item) => item)
        //         })
        //         .switchMap((data: any[]) => Observable.of(data))
        //         .catch((error: firebase.FirebaseError) => Observable.throw(this.mapToMapError(error)));

        //    firebaseObservable(firebase.database().ref('tracks'), 'once')
        //         .map(() => {
        //             console.log('hänt något? ')
        //             return null //data.map((item) => this.mapFromTrackFirebasModelToTrackModel(item))
        //         })
        //         .switchMap((data: any[]) => Observable.of(data))
        //         .catch((error: firebase.FirebaseError) => Observable.throw(this.mapToMapError(error)));
        return null;
    }

    addTrack(track: Track): Observable<Track | MapError> {
        const key = this.generateUniqueId();
        const fbtrack = this.mapFromTrackModelToFirebaseTrackModel(track);
        console.log(fbtrack)
        return Observable.fromPromise(firebase.database().ref('tracks').child(key)
            .set(fbtrack)
            .then(() => {
                track.categoryKeys.forEach((categoryKey) => {
                    firebase.database().ref('/categories/' + categoryKey + '/tracks/').once('value', function (snapshot) {
                        snapshot.ref.update({ [key]: true });
                    });
                })
            }))
            .switchMap(() => { console.log('save'); return Observable.of(track) })
            .catch((error: firebase.FirebaseError) => Observable.throw(this.mapToMapError(error)));
    }

    addControlPoint(controlPonit: ControlPoint): Observable<ControlPoint | MapError> {
        const key = this.generateUniqueId();
        const fbPoint = this.mapFromControlPointModelToFirebasePointModel(controlPonit);
        return Observable.fromPromise(firebase.database().ref('control_points').child(key)
            .set(fbPoint))
            .switchMap(() => {
                return Observable.of(fbPoint)
            })
            .catch((error: firebase.FirebaseError) => Observable.throw(this.mapToMapError(error)));
    }

    addControlPoints(controlPonits: ControlPoint[]): Observable<ControlPoint[] | MapError> {
        const newList: ControlPoint[] = [];
        controlPonits.forEach((controlPoint) => {
            const key = this.generateUniqueId();
            controlPoint.key = key;
            const fbPoint = this.mapFromControlPointModelToFirebasePointModel(controlPoint);
            firebase.database().ref('control_points').child(fbPoint.key)
                .set(fbPoint);
            newList.push(controlPoint);
        })

        return Observable.of(newList);
    }

    mapToMapError(error: firebase.FirebaseError): MapError {
        return {
            code: error.code,
            message: error.message,
        }
    }

    mapFromControlPointModelToFirebasePointModel(controlPoint: ControlPoint): FirebasePoint {
        const fbPoint: FirebasePoint = {
            key: controlPoint.key,
            mapLocation: controlPoint.mapLocation,
            text: controlPoint.text ? controlPoint.text : null
        }
        return fbPoint;
    }


    mapFromTrackModelToFirebaseTrackModel(track: Track): FirebaseTrack {
        const tempList: ControlPoint_Question[] = []
        console.log(track.controlPoints[0].key)
        track.controlPoints.forEach(cp => {
            let c_q: ControlPoint_Question = {
                controlPointKey: cp.key,
                questionKey: cp.questionKey ? cp.questionKey : null,
                order: cp.orderInTrack
            }
            tempList.push(c_q);
        });
     
        tempList.sort((x,y) => {
            if(x.order < y.order) return -1;
            else return 1;
        })

        const fbtrack: FirebaseTrack = {
            name: track.name,
            categoryKeys: track.categoryKeys ? track.categoryKeys : [],
            controlPoints_questions: tempList
        }
        console.log(tempList)
        return fbtrack;
    }



    generateUniqueId(): string {
        return firebase.database().ref().push().key;
    }

}
