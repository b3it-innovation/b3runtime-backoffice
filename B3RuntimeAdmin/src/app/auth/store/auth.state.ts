import { AuthenticationError } from 'app/auth/model/authentication-error.model';
import { AuthenticationUser } from 'app/auth/model/authentication-user.model';

export interface AuthState {
    user: AuthenticationUser;
    isLoggedIn: boolean;
    error: AuthenticationError;
    isLoading: boolean;
    emailVerificationSent: boolean;
    forgotPasswordSent: boolean;
}

export const authInitialState: AuthState = {
    user: null,
    isLoggedIn: false,
    error: null,
    isLoading: false,
    emailVerificationSent: false,
    forgotPasswordSent: false
}
