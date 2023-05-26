import refreshTokenRepository from "@/infra/repository/cookies/RefreshTokenRepository";
import { NextApiResponse } from "next";

const refreshTokenStoreService ={
    toUser(refreshToken:string, res: NextApiResponse<ICredentialData | IErrorMessage>): void {
        let refresh_token_id = process.env.REFRESH_TOKEN_USER;

        if (!refresh_token_id){
            throw new Error('Refresh token id not found');
        }

        refreshTokenRepository.save(refresh_token_id, refreshToken, res);
    },
    toApp(refreshToken:string, res: NextApiResponse<ICredentialData | IErrorMessage>): void {
        let refresh_token_id = process.env.REFRESH_TOKEN_APP;

        if (!refresh_token_id){
            throw new Error('Refresh token id not found');
        }

        refreshTokenRepository.save(refresh_token_id, refreshToken, res);
    }
    
    

}

export default refreshTokenStoreService;