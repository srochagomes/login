

const loggedRepository = {
    save(key:string, user: IUserLogged){
        globalThis?.sessionStorage?.setItem(key, JSON.stringify(user));
    },
    get(key:string): IUserLogged | null{                

        const jsonData: string | null = globalThis?.sessionStorage?.getItem(key);
        if (jsonData){
            const data: IUserLogged = JSON.parse(jsonData);
            return data;                
        }    

        return null;
        
    },
    remove(key:string){
        globalThis?.sessionStorage?.removeItem(key);
    },
}

export default loggedRepository;