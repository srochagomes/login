import { decryptData, encryptData } from "@/util/CryptoValue";
import { ONE_DAY } from "@/util/FrameTimer"
import { NextApiRequest, NextApiResponse } from "next";
import nookies, { destroyCookie, parseCookies, setCookie } from 'nookies';

const refreshTokenRepository = {

    save(refresh_token_id: string, newRefreshToken: string, res: NextApiResponse) {    
        
        if (!refresh_token_id){
            throw new Error('Refresh token should be informed.');
        }

        let key_cript = process.env.KEY_CRIPTO;


        if (!key_cript){
            throw new Error('Key not configured.');
        }
        
        setCookie({res}, refresh_token_id, encryptData( newRefreshToken, key_cript), {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: ONE_DAY,
            path: '/'
          })
    
    },

    get(refresh_token_id:string, req: NextApiRequest){

        if (!refresh_token_id){
            throw new Error('Refresh token id not found');
        }

        let key_cript = process.env.KEY_CRIPTO;

        if (!key_cript){
            throw new Error('Key not found');
        }

        const cookies = parseCookies({req});        
        const refreshToken = cookies[refresh_token_id]
        if (refreshToken){
            return decryptData( cookies[refresh_token_id], key_cript);
        }

        return null;
        
    },
    remove(refresh_token_id:string, res: NextApiResponse<ICredentialData | IErrorMessage>){
        if (!refresh_token_id){
            throw new Error('Refresh token id not found');
        }               
        
        destroyCookie({res}, refresh_token_id,{path: '/'});
        
             
    }
    
}

export default refreshTokenRepository;