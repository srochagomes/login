import accountManager from "@/infra/api/account/AccountManager";


const account = {
     create(newAccount:INewAccount){
        return accountManager.createNew(newAccount)
            .then((response)=> {
                return response;
            })

    }

}


export default account;