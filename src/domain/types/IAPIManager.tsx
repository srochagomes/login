interface IAPIManager{
    getToken: () => string | null,
    processRefreshToken: () => boolean,
    redirect: () => void,
}