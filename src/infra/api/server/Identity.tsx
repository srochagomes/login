import { headerJson} from "@/infra/protocol/http/CallAPI";
import callAPI from "@/infra/protocol/http/CallAPI";
const USER_API_AUTH_SERVER = 'api/auth/user';
const APP_API_AUTH_SERVER = 'api/auth/app';
const LOGOUT_USER_API_AUTH_SERVER = 'api/auth/logout';


const identity = {

    getTokenUser : async (user: IUserAuth) => {
        let baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
        let api = callAPI(`${baseURL}`);

        let response =  await api.post(USER_API_AUTH_SERVER, user, headerJson)
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
    logoutUser : async () => {
      let baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
      let api = callAPI(`${baseURL}`);

      let response =  await api.delete(LOGOUT_USER_API_AUTH_SERVER, headerJson)
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


    getTokenApp : async () => {
      let baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
      let api = callAPI(`${baseURL}`);

      let response =  await api.post(APP_API_AUTH_SERVER, null, headerJson)
      .then(response => {
          return { 
            status: response.status, 
            data: response.data}
        }).catch((error) => {
          
          return {
            status: error.response?.status, 
            data: error.response?.data}
        });
        
        return response; 
  }
    
}

export default identity;