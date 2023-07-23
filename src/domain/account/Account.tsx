import accountManager from "@/infra/api/account/AccountManager";
import accessManager from "@/infra/api/auth/AccessManager";


const account = {
     create(newAccount:INewAccount){
        return accountManager.createNew(newAccount)
            .then((response)=> {
                return response;
            })

    },
    confirmAccess(confirmAccess:IAccessConfirm){
        return accessManager.confirmAccess(confirmAccess)
            .then((response)=> {
                return response;
            })
    }


}


export default account;