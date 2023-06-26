import accountManager from "@/infra/api/account/AccountManager";
import accountConnect from "@/infra/api/server/AccountConnect";

const account = {
     create(newAccount:INewAccount){
        return accountManager.createNew(newAccount)
            .then((response)=> {
                return response;
            })

    }

}


export default account;