import { AuthenticationUser } from 'app/auth/model/authentication-user.model';

export interface RegisterUserRequest {
    email: string,
    password: string,
    firstName: string,
    lastName: string
}

export interface RegisterUserResponse {
    user: AuthenticationUser,
    firstName: string,
    lastName: string
}
