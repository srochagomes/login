import axios, { HttpStatusCode } from "axios";
import userAdapter from "./adapters/UserAdapter";
import accessManager from "@/infra/api/auth/AccessManager";



export const callAPI = (baseURL: string, tokenAdapterManager?: IAPIManager) => {

    const http = axios.create({
        baseURL: `${baseURL}`,
        timeout: 3000,
        // Outras configurações do Axios (opcional)
      });

      if (tokenAdapterManager){
          http.interceptors.request.use(function (config) {
            
            config.headers.Authorization = `Bearer ${tokenAdapterManager.getToken()}`  

            return config;
          }, function (error) {
            
            console.log('Erro no interceptor do axios')
            return Promise.reject(error);
          });

          http.interceptors.response.use(
            response => response,
            async error => {
              if ((error.response && error?.response?.status === HttpStatusCode.Unauthorized) 
                  || error.code === 'ERR_NETWORK') {
                try {
                  if (await tokenAdapterManager.processRefreshToken()){
                    error.config.headers['Authorization'] = `Bearer ${tokenAdapterManager.getToken()}`
                    console.log('Token ATUALIZADO COM SUCESSO');
                    return http.request(error.config);
                  }                  

                } catch (error) {
                  console.log('passo4')
                  console.error('Erro na atualização do token:', error);
                }
                
              }
              
              tokenAdapterManager.redirect();              
              
              return Promise.resolve(error)
            }
          );
      
      }

      return http;
}





export const connectServiceHttp = {  
    toAPI :{
      withoutToken:()=> callAPI(`${process.env.NEXT_PUBLIC_APIGATEWAY_BASE_URL}`),
      asApp:()=> callAPI(`${process.env.NEXT_PUBLIC_APIGATEWAY_BASE_URL}`),
      asUser:()=> callAPI(`${process.env.NEXT_PUBLIC_APIGATEWAY_BASE_URL}`, userAdapter),
    },
    toBackend :{
      withoutToken:()=> callAPI(`${process.env.NEXT_PUBLIC_BACKEND_URL}`),
      asApp:()=> callAPI(`${process.env.NEXT_PUBLIC_BACKEND_URL}`),
      asUser:()=> callAPI(`${process.env.NEXT_PUBLIC_BACKEND_URL}`),
    }
    
  }






export const headerJson = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
}

 

