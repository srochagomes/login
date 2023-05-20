interface ITokenAccess{
    get: () => void;
    save: (tokenAccess: string) => void;
    hasToken: () => boolean;
}