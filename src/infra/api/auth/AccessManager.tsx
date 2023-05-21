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
            console.log('payload:', response.data);            
                 
            let dataReturn: IAPIReturn =  {
                status:  response.status,
                statusText:   response.statusText,
                data:  response.data
            };
            return dataReturn;
          })
          .catch((error) => {
            console.error('Erro ao fazer a solicitação:', error);
            return {
                status: error.status,
                statusText: error.statusText,
                data: error.data
            }
          });       
          
    } 


}

export default accessManager;