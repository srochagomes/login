import { headerJson} from "@/infra/protocol/http/CallAPI";
import callAPI from "@/infra/protocol/http/CallAPI";



const identity = ()=>{

    getToken : async (user: IUserAuth) => {
        let baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
        let api = callAPI(`${baseURL}`);

        const response = await api.post('/auth', user, headerJson)
        .then(response => {
            console.log('Resposta:', response.data);
          })
          .catch(error => {
            console.error('Erro ao fazer a solicitação:', error);
          });
   
    }
    
}

export default identity;