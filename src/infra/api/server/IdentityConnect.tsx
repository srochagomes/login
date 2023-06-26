import { connectServiceHttp, headerJson} from "@/infra/protocol/http/CallAPI";



const identityConnect = {

    getTokenUser : async (user: IUserAuth) => {        
        
        let api = connectServiceHttp.toBackend.withoutToken();

        let response =  await api.post(`${process.env.NEXT_PUBLIC_BACKEND_USER_LOGIN}`, user, headerJson)
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
    getRefreshTokenUser : () => {        
        
      let api = connectServiceHttp.toBackend.withoutToken();

      let response =  api.post(`${process.env.NEXT_PUBLIC_BACKEND_REFRESH_TOKEN}`, {type_refresh:'user'}, headerJson)
      .then(async(response) => {                        
          return await { 
            status: response.status,  
            data: response.data}
        }).catch(async(error) => {
          
          return await {
            status: error?.response?.status, 
            data: error?.response?.data}
        });
 
        return response; 
  },
    logoutUser : async () => {
      let api = connectServiceHttp.toBackend.withoutToken();

      let response =  await api.delete(`${process.env.NEXT_PUBLIC_BACKEND_USER_LOGOUT}`, headerJson)
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
      let api = connectServiceHttp.toBackend.withoutToken();

      let response =  await api.post(`${process.env.NEXT_PUBLIC_BACKEND_APP_LOGIN}`, null, headerJson)
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
  },
  getRefreshTokenApp : async () => {        
      
    let api = connectServiceHttp.toBackend.withoutToken();

    let response =  await api.post(`${process.env.NEXT_PUBLIC_BACKEND_REFRESH_TOKEN}`, {type_refresh:'app'}, headerJson)
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
}
    
}

export default identityConnect;