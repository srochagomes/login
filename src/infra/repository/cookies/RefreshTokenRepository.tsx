import { decryptData, encryptData } from "@/util/CryptoValue";
import { ONE_DAY } from "@/util/FrameTimer"
import { NextApiRequest, NextApiResponse } from "next";
import { parseCookies, setCookie } from 'nookies';

const refreshTokenRepository = {

    save(newRefreshToken: string, res: NextApiResponse) {    
        let refresh_token_id = process.env.REFRESH_TOKEN_NAME;
        let key_cript = process.env.KEY_CRIPTO;

        if (!refresh_token_id){
            throw new Error('Refresh token id not found');
        }

        if (!key_cript){
            throw new Error('Key not found');
        }
        
        setCookie({res}, refresh_token_id, encryptData( newRefreshToken, key_cript), {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: ONE_DAY,
            path: '/'
          })
    
    },

    get(req: NextApiRequest){

        let refresh_token_id = process.env.REFRESH_TOKEN_NAME;
        
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
        
    }
    
}

export default refreshTokenRepository;