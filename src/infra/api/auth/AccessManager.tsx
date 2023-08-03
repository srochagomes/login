import { connectServiceHttp, headerJson } from "@/infra/protocol/http/CallAPI";




const accessManager = {
    
    async getCredentialAccess(credential : ICredentialAuth): Promise<IAPIReturn> {        

        
        let apiAddress = process.env.API_TOKEN_REQUEST;

        if (!apiAddress){
            throw new Error("API_TOKEN_REQUEST should be informed");
        }

        let api = connectServiceHttp.toAPI.withoutToken();
        
        return await api.post<IAPIReturn>(apiAddress, credential, headerJson)
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
          
    }, 
    async getRefreshCredentialAccess(credential : ICredentialAuth): Promise<IAPIReturn> {        

        
        let apiAddress = process.env.API_REFRESH_TOKEN_REQUEST;

        if (!apiAddress){
            throw new Error("API_TOKEN_REQUEST should be informed");
        }

        let api = connectServiceHttp.toAPI.withoutToken();
        
        return await api.post<IAPIReturn>(apiAddress, credential, headerJson)
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
          
    }, 
    
    async getSession(): Promise<IAPIReturn> {
        
        let apiAddress = process.env.NEXT_PUBLIC_API_SESSION_REQUEST;

        if (!apiAddress){
            throw new Error("API_TOKEN_REQUEST not found to use");
        }

        let api = connectServiceHttp.toAPI.asUser();
        
        return await api.get<IAPIReturn>(apiAddress,headerJson)
        .then((response) => {          
            console.log("Info",response);     
            let dataReturn: IAPIReturn =  {
                status:  response.status,
                statusText:   response.statusText,
                data:  response.data
            };
            return dataReturn;
          })
          .catch((error) => {
            console.log("Error:",error);
            return {
                status: error?.status,
                statusText: error?.statusText,
                data: error.data,  
                requireLogin: error.requireLogin              
            }
          });       

    },
    async confirmAccess(accessConfirmData : IAccessConfirm): Promise<IAPIReturn> {        
        let apiAddress = process.env.NEXT_PUBLIC_API_CONFIRM_ACCESS;

        if (!apiAddress){
            throw new Error("API_TOKEN_REQUEST not found to use");
        }

        if (accessConfirmData.key){
            apiAddress = apiAddress.replace(/{{key}}/g, accessConfirmData.key)
        }

        let api = connectServiceHttp.toAPI.asApp()

        let body : IAccessConfirm = {
            value : accessConfirmData.value
        }

        
        return await api.put<IAPIReturn>(apiAddress,body,headerJson)
        .then((response) => {          
            console.log("Info",response);     
            let dataReturn: IAPIReturn =  {
                status:  response.status,
                statusText:   response.statusText,
                data:  response.data
            };
            return dataReturn;
          })
          .catch((error) => {
            console.log("Error:",error);
            return {
                status: error?.status,
                statusText: error?.statusText,
                data: error.data,  
                requireLogin: error.requireLogin              
            }
          });  

    }
}

export default accessManager;