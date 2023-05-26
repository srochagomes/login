import { headerJson} from "@/infra/protocol/http/CallAPI";
import callAPI from "@/infra/protocol/http/CallAPI";
import accessTokenRepository from "@/infra/repository/cookies/AccessTokenRepository";

const USER_API_AUTH_SERVER = 'api/auth/user';
const APP_API_AUTH_SERVER = 'api/auth/app';

const identity = {

    getTokenUser : async (user: IUserAuth) => {
        let baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
        let api = callAPI(`${baseURL}`);
        let access_token_id = process.env.NEXT_PUBLIC_ACCESS_TOKEN_USER;      

        let response =  await api.post(USER_API_AUTH_SERVER, user, headerJson)
        .then(response => {                        
            
            if (!access_token_id){
              throw new Error('Access token id not found');
            }
            accessTokenRepository.save(access_token_id, response.data.access_token);

            return { status: response.status , 
                     ...response.data}
          })
          .catch(error => {
            console.error('Erro ao fazer a solicitação:', error);
            return {
              status: error.response.status , 
              ...error.response.data}
          });
   
          return response; 
    },

    getTokenApp : async () => {
      let baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
      let api = callAPI(`${baseURL}`);
      let access_token_id = process.env.NEXT_PUBLIC_ACCESS_TOKEN_APP;      

      let response =  await api.post(APP_API_AUTH_SERVER, null, headerJson)
      .then(response => {
          
          if (!access_token_id){
            throw new Error('Access token id not found');
          }

          accessTokenRepository.save(access_token_id, response.data.access_token);
          return { status: response.status , 
            ...response.data}
        })
        .catch(error => {
          console.error('Erro ao fazer a solicitação:', error);
          return {
            status: error.response.status , 
            ...error.response.data}
        });
        
        return response; 
  }
    
}

export default identity;