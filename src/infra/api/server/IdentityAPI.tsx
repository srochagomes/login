import { headerJson} from "@/infra/protocol/http/CallAPI";
import callAPI from "@/infra/protocol/http/CallAPI";

const API_AUTH_SERVER = 'api/auth';

const identityAPI = {

    getToken : async (user: IUserAuth) => {
        let baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
        let api = callAPI(`${baseURL}`);

        const response = await api.post(API_AUTH_SERVER, user, headerJson)
        .then(response => {
            console.log('Resposta:', response);
          })
          .catch(error => {
            console.error('Erro ao fazer a solicitação:', error);
          });
   
    }
    
}

export default identityAPI;