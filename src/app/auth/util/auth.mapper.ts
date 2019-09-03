import { AuthenticationError } from 'app/auth/model/authentication-error.model';
import { AuthenticationUser } from 'app/auth/model/authentication-user.model';
import * as firebase from 'firebase/app';

export class AuthMapper {
    // map firebase user to internal usertoken
    public static mapFirebaseUserToAuthenticationUser(user: firebase.User): AuthenticationUser {
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
    public static mapFirebaseErrorToAuthenticationError(fbError: firebase.FirebaseError) {
        return new AuthenticationError(fbError.code, fbError.message);
    }
}

