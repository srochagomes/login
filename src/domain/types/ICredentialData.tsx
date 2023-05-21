interface ICredentialData{
    access_token: string,
    expires_in: BigInteger,
    refresh_expires_in: BigInteger,
    refresh_token: string,
    token_type: string,
    id_token: string,
    not_before_policy: BigInteger,
    session_state: string,
    scope: string
  }