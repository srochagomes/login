interface IAPIManager{
    getToken: () => string | null,
    processRefreshToken: () => Promise<boolean> ,
    redirect: () => void,
}