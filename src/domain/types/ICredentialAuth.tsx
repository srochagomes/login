interface ICredentialAuth{
    grant_type: string,
    client_id: string,
    client_secret: string,
    username?: string | undefined,
    password?: string | undefined,
    scope: string
 
}