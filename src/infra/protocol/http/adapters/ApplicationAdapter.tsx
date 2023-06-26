import applicationSession from "@/domain/session/ApplicationSession";

const applicationAdapter:IAPIManager = {
    getToken() {
        return applicationSession.accessToken();
    },
    processRefreshToken: () => {
        return applicationSession.refresh()
          .then((dado) => {
            console.log('Valor do processamento dentro:', dado);
            return dado;
          })
          .catch((error) => {
            return error;
          });
      }
  }


export default applicationAdapter;