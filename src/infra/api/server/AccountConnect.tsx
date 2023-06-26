import { connectServiceHttp, headerJson} from "@/infra/protocol/http/CallAPI";



const accountConnect = {
    create : async (newAccount: INewAccount) => {        
        
        let api = connectServiceHttp.toBackend.withoutToken();

        let response =  await api.post(`${process.env.NEXT_PUBLIC_BACKEND_ACCOUNT_CREATE}`, newAccount, headerJson)
        .then(response => {                        
            return { 
              status: response.status,  
              data: response.data}
          }).catch(error => {
            
            return {
              status: error?.response?.status, 
              data: error?.response?.data}
          });
   
          return response; 
    },    

}


export default accountConnect;