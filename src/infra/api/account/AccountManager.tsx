import { connectServiceHttp, headerJson } from "@/infra/protocol/http/CallAPI";




const accountManager = {
    
    async createNew(newAccount : INewAccount): Promise<IAPIReturn> {    
        let apiAddress = process.env.NEXT_PUBLIC_API_ACCOUNT;

        if (!apiAddress){
            throw new Error("API_TOKEN_REQUEST not found to use");
        }
        
        let api = connectServiceHttp.toAPI.asApp();
        
        return await api.post<IAPIReturn>(apiAddress, newAccount, headerJson)
        .then((response) => {                      
            let dataReturn: IAPIReturn =  {
                status:  response.status,
                statusText:   response.statusText,
                data:  response.data
            };
            return dataReturn;
          })
          .catch((error) => {
            
            return {
                status: error?.response?.status,
                statusText: error?.response?.statusText,
                data: error.response?.data                
            }
          }); 
    }
}

export default accountManager