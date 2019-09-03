export interface AuthenticationUser {
    id: string,
    displayName: string,
    verified: boolean,
    token: string,
    email: string,
    displayPhotoUrl?: string
}
