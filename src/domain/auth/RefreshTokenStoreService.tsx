import refreshTokenRepository from "@/infra/repository/cookies/RefreshTokenRepository";
import { NextApiRequest, NextApiResponse } from "next";

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
    },
    getOfUser( req: NextApiRequest): string | null {
        console.log('REFRESH TOKEN do USER');
        let refresh_token_id = process.env.REFRESH_TOKEN_USER;

        if (!refresh_token_id){
            throw new Error('Refresh token id to user should be informed');
        }

        return refreshTokenRepository.get(refresh_token_id, req);
    },
    getOfApp( req: NextApiRequest): string | null {
        console.log('REFRESH TOKEN do APP')
        let refresh_token_id = process.env.REFRESH_TOKEN_APP;

        if (!refresh_token_id){
            throw new Error('Refresh token id to app should be informed');
        }

        return refreshTokenRepository.get(refresh_token_id, req);
    },
    logoutUser(res: NextApiResponse<ICredentialData | IErrorMessage>): void {
        let refresh_token_id = process.env.REFRESH_TOKEN_USER;

        if (!refresh_token_id){
            throw new Error('Refresh token id not found');        }

        refreshTokenRepository.remove(refresh_token_id,res);
        
    }

}

export default refreshTokenStoreService;