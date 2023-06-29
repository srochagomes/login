import accessTokenRepository from "@/infra/repository/cookies/AccessTokenRepository"
import identity from "@/infra/api/server/IdentityConnect"
import { HttpStatusCode } from "axios";
import jwt, { JwtPayload } from 'jsonwebtoken'


const writeTokenData = (authAPIData: IAPIReturn): void =>{    
  let access_token_id = process.env.NEXT_PUBLIC_ACCESS_TOKEN_APP;      
  if (!access_token_id){
    throw new Error('Access token id not found');
  }
  accessTokenRepository.save(access_token_id, authAPIData.data.access_token);
}




const applicationSession = {

    getData(){

      let access_token_id = process.env.NEXT_PUBLIC_ACCESS_TOKEN_APP;          
      if (!access_token_id){
        throw new Error('Access token should be informed.');
      }
      let token:string|null = accessTokenRepository.get(access_token_id);
      if (token){
        let decodedIdTokenData: JwtPayload = jwt.decode(token) as JwtPayload;  
        return decodedIdTokenData;
      }
      return null;    
        
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
    },
    refresh(){
      return identity.getRefreshTokenApp()
      .then(async (userDataAPI:IAPIReturn)=>{
          if (userDataAPI.status === HttpStatusCode.Ok){
              writeTokenData(userDataAPI);
              console.log("Atualizou token")              
          }
          return await userDataAPI;;
      });     

    },


}

export default applicationSession;