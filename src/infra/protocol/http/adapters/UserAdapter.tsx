
import userSession from "@/domain/session/UserSession";


const userAdapter:IAPIManager = {
    getToken() {
        return userSession.accessToken();
    },
    processRefreshToken: () => {
        return userSession.refresh()
          .then((dado) => {
            console.log('Valor do processamento dentro:', dado);
            return dado;
          })
          .catch((error) => {
            return error;
          });
      },
    
}

export default userAdapter;