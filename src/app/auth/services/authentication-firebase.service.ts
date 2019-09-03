import 'firebase/auth';

import { AuthenticationError } from 'app/auth/model/authentication-error.model';
import { AuthenticationUser } from 'app/auth/model/authentication-user.model';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export class AuthenticationFirebaseService {

    private authStateChanges: Subject<AuthenticationUser | AuthenticationError> = new Subject<AuthenticationUser | AuthenticationError>();

    constructor() {
        // keep track on currently logged in user
        firebase.auth().onAuthStateChanged(
            (user: firebase.User) => {
                this.authStateChanges.next(this.mapToUserToken(user));
            },
            (error: firebase.FirebaseError) => {
                this.authStateChanges.next(this.mapToAuthenicationError(error));
            });

    }

    getAuthStateChange(): Observable<AuthenticationUser | AuthenticationError> {
        return this.authStateChanges.asObservable();
    }

    getUser() {

    }

    // creates a user in firebase with email/password
    registerUserByEmail(email: string, password: string, firstName: string, lastName: string): Observable<AuthenticationUser | AuthenticationError> {
        return Observable.fromPromise(firebase.auth().createUserWithEmailAndPassword(email, password))
            .switchMap((user: firebase.User) => {
                return Observable.forkJoin(
                    Observable.of(user),
                    Observable.fromPromise(user.sendEmailVerification()),
                    Observable.fromPromise(user.updateProfile({ displayName: firstName + ' ' + lastName, photoURL: '' }))
                )
            })
            .mergeMap((results: any[]) => {
                return Observable.of(this.mapToUserToken(results[0]));
            })
            .catch((error: firebase.FirebaseError) => Observable.throw(this.mapToAuthenicationError(error)));
    }

    // logs in to firebase with email/password
    signInUserByEmail(email: string, password: string): Observable<AuthenticationUser | AuthenticationError> {
        return Observable.fromPromise(firebase.auth().signInWithEmailAndPassword(email, password))
            .switchMap((user: firebase.User) => Observable.of(this.mapToUserToken(user)))
            .catch((error: firebase.FirebaseError) => Observable.throw(this.mapToAuthenicationError(error)));
    }

    // sends an e-mail verification letter to the user
    resendVerificationEmail(): Observable<AuthenticationError> {
        return Observable.fromPromise(firebase.auth().currentUser.sendEmailVerification())
            .catch((error: firebase.FirebaseError) => Observable.throw(this.mapToAuthenicationError(error)));
    }

    // sends a password reset mail to the user
    sendResetPasswordMail(email: string): Observable<AuthenticationError> {
        return Observable.fromPromise(firebase.auth().sendPasswordResetEmail(email))
            .catch((error: firebase.FirebaseError) => Observable.throw(this.mapToAuthenicationError(error)));
    }

    // login with a google account
    signInWithGoogle(): Observable<AuthenticationUser | AuthenticationError> {
        return Observable.fromPromise(firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()))
            .switchMap((result: firebase.auth.UserCredential) => Observable.of(this.mapToUserToken(result.user)))
            .catch((error: firebase.FirebaseError) => Observable.throw(this.mapToAuthenicationError(error)));
    }

    signOut(): Observable<AuthenticationError> {
        return Observable.fromPromise(firebase.auth().signOut())
            .catch((error: firebase.FirebaseError) => Observable.throw(this.mapToAuthenicationError(error)));
    }

    updateUserPhoto(displayPhotoUrl: string): Observable<any | AuthenticationError> {
        const user = firebase.auth().currentUser;

        return Observable.fromPromise(firebase.auth().currentUser.updateProfile(
            { displayName: user.displayName, photoURL: displayPhotoUrl }))
            .switchMap((result) => Observable.of({ displayPhotoUrl: displayPhotoUrl }))
            .catch((error: firebase.FirebaseError) => Observable.throw(this.mapToAuthenicationError(error)));
    }

    // map firebase user to internal usertoken
    private mapToUserToken(user: firebase.User): AuthenticationUser {
        let authUser: AuthenticationUser = null;
        if (user) {
            authUser = {
                id: user.uid,
                displayName: user.displayName,
                verified: user.emailVerified,
                token: 'PLEASE SET THIS', // TODO: Kolla detta
                email: user.email,
                displayPhotoUrl: user.photoURL
            }
        }

        return authUser;
    }

    // map firebase auth error to Authentication Error
    private mapToAuthenicationError(fbError: firebase.FirebaseError) {
        return new AuthenticationError(fbError.code, fbError.message);
    }
}
