import { AuthenticationUser } from 'app/auth/model/authentication-user.model';

export interface LoginRequest {
    email: string,
    password: string
}

export interface LoginStateCheckRequest {
    user: AuthenticationUser,
    provider: string
}


export interface LoginResponse {
    user: AuthenticationUser
}
