import accessTokenRepository from "@/infra/repository/cookies/AccessTokenRepository"
import identity from "@/infra/api/server/Identity"
import { HttpStatusCode } from "axios";


const writeTokenData = (authAPIData: IAPIReturn): void =>{    
  let access_token_id = process.env.NEXT_PUBLIC_ACCESS_TOKEN_APP;      
  if (!access_token_id){
    throw new Error('Access token id not found');
  }
  accessTokenRepository.save(access_token_id, authAPIData.data.access_token);
}




const applicationSession = {

    isActive(){

      
        
    },
    register(){
      return identity.getTokenApp()
      .then((appDataAPI:IAPIReturn)=> {
        if (appDataAPI.status === HttpStatusCode.Ok){
          writeTokenData(appDataAPI);
        }
        return appDataAPI;
      });  
    },
    accessToken(){

      let access_token_id = process.env.NEXT_PUBLIC_ACCESS_TOKEN_APP;          
      if (!access_token_id){
        throw new Error('Access token should be informed.');
      }
      return accessTokenRepository.get(access_token_id);
    }


}

export default applicationSession;