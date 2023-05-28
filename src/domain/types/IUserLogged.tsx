
interface IUserLogged{
    acr?: string | undefined,
    at_hash?: string | undefined,
    aud?: string | string[] | undefined,
    email_verified?: boolean | undefined,
    exp?: number | undefined,
    family_name?: string | undefined,
    given_name?: string | undefined,
    iat?: number | undefined,
    jti?: string | undefined,
    preferred_username?: string | undefined,
    session_state?: string | undefined,
    logged?: boolean
}