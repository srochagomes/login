
import userSession from "@/domain/session/UserSession";
import { useRouter } from 'next/router';

const userAdapter:IAPIManager = {
    getToken() {
        return userSession.accessToken();
    },
    processRefreshToken: () => {
        return userSession.refresh()
          .then((dado) => {
            console.log('Valor do processamento dentro:', dado);
            return dado.updated;
          })
          .catch((error) => {
            return false;
          });
      },
    redirect() {
        console.log('Chamando nova rota:');
        const router = useRouter();
        router.push('/?error=401');
    },
}

export default userAdapter;