import callAPI, { headerJson } from "@/infra/protocol/http/CallAPI";




const accessManager = {
    
    async getCredentialAccess(credential : ICredentialAuth): Promise<IAPIReturn> {

        let baseURL = process.env.APIGATEWAY_BASE_URL;
        let apiAddress = process.env.API_TOKEN_REQUEST;

        if (!apiAddress){
            throw new Error("API_TOKEN_REQUEST not found to use");
        }

        let api = callAPI(`${baseURL}`);       
        
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

        let baseURL = process.env.NEXT_PUBLIC_APIGATEWAY_BASE_URL;
        let apiAddress = process.env.NEXT_PUBLIC_API_SESSION_REQUEST;

        if (!apiAddress){
            throw new Error("API_TOKEN_REQUEST not found to use");
        }

        let api = callAPI(`${baseURL}`);       
        
        return await api.post<IAPIReturn>(apiAddress,null, headerJson)
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

export default accessManager;