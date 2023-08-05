interface ICredentialAuth{
    grant_type: string,
    client_id: string,
    client_secret: string,
    code?: string | undefined,
    redirect_uri?: string | undefined,
    username?: string | undefined,
    password?: string | undefined,
    refresh_token?: string | null | undefined,
    scope?: string | undefined
 
}