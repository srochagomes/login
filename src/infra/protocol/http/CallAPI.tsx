import axios from "axios";



const callAPI = (baseURL: string, tokenService : ITokenAccess | null = null ) => {

    const http = axios.create({
        baseURL: `${baseURL}`,
        timeout: 3000,
        // Outras configurações do Axios (opcional)
      });

      if (tokenService?.hasToken()){
          http.interceptors.request.use(function (config) {
            // Do something before request is sent
            config.headers.Authorization = `Bearer ${tokenService.get()}`
            
            return config;
          }, function (error) {
            // Do something with request error
            console.log('Erro no interceptor do axios')
            return Promise.reject(error);
          });
      
      }

      return http;
}

export default callAPI;

export const headerJson = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
}

 

