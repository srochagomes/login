import { ONE_DAY } from "@/util/FrameTimer"
import { parseCookies, setCookie } from 'nookies';

const accessTokenRepository = {

    save(access_token_id: string, newAccessToken: string) {    

        if (!access_token_id){
            throw new Error('Access token id should be informed.');
        }
        
        
        setCookie(null, access_token_id, newAccessToken, {            
            sameSite: 'lax',
            maxAge: ONE_DAY,
            path: '/'
          })
    
    },

    get(access_token_id:string){

        const cookies = parseCookies();        
        const accessToken = cookies[access_token_id]
        if (accessToken){
            return cookies[access_token_id];
        }

        return null;
        
    }
    
}

export default accessTokenRepository;