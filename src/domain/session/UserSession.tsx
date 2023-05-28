import identity from "@/infra/api/server/Identity"
import { HttpStatusCode } from "axios";
import accessTokenRepository from "@/infra/repository/cookies/AccessTokenRepository"
import loggedRepository from "@/infra/repository/user/LoggedRepository";
import jwt, { JwtPayload } from 'jsonwebtoken'
import accessManager from "@/infra/api/auth/AccessManager";


const writeTokenData = (authAPIData: IAPIReturn): void =>{
    
    let access_token_id = process.env.NEXT_PUBLIC_ACCESS_TOKEN_USER;      
    let logged_key = process.env.NEXT_PUBLIC_USER_LOGGED;

    if (!access_token_id){
        throw new Error('Access token should be informed.');
      }

      if (!logged_key){
        throw new Error('Logged key should be informed.');
      }
      
      accessTokenRepository.save(access_token_id, authAPIData.data.access_token);            
      let decodedIdTokenData: JwtPayload = jwt.decode(authAPIData.data.id_token) as JwtPayload;  
      let userLogged: IUserLogged ={
        ...decodedIdTokenData            
      };

      loggedRepository.save(logged_key, userLogged);            

}


const userSession = {

    isLogged(){
      let access_token_id = process.env.NEXT_PUBLIC_ACCESS_TOKEN_USER;          
      let user_data_key = process.env.NEXT_PUBLIC_USER_LOGGED
      if (!access_token_id){
        throw new Error('Access token should be informed.');
      }
      if (!user_data_key){
        throw new Error('User data key should be informed.');
      }



      let token = accessTokenRepository.get(access_token_id);            
      if (token){        
        let userLogged = loggedRepository.get(user_data_key);
        if (userLogged){

          return {
            ...userLogged,
            logged:true
          }       
        }

      }


      return {        
        logged:false
      }
      
        
    },
    register(user: IUserAuth){
        return identity.getTokenUser(user)
        .then((userDataAPI:IAPIReturn)=>{
            if (userDataAPI.status === HttpStatusCode.Ok){
                writeTokenData(userDataAPI);
            }
            return userDataAPI;
        });     

    },
    logout(){
      return identity.logoutUser()
        .then((userDataAPI:IAPIReturn)=>{
            if (userDataAPI.status === HttpStatusCode.Ok){
              let access_token_id = process.env.NEXT_PUBLIC_ACCESS_TOKEN_USER;          
              let user_data_key = process.env.NEXT_PUBLIC_USER_LOGGED
              if (!access_token_id){
                throw new Error('Access token should be informed.');
              }
              if (!user_data_key){
                throw new Error('User data key should be informed.');
              }
              accessTokenRepository.remove(access_token_id);            
              loggedRepository.remove(user_data_key);
            }
            return userDataAPI;
        });
    },
    accessToken(){

      let access_token_id = process.env.NEXT_PUBLIC_ACCESS_TOKEN_USER;          
      if (!access_token_id){
        throw new Error('Access token should be informed.');
      }
      return accessTokenRepository.get(access_token_id);
    },
    session(){
      return accessManager.getSession();
    }

}

export default userSession;