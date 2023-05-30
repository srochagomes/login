interface IAPIManager{
    getToken: () => string | null,
    processRefreshToken: () => Promise<IAPIReturn>
}