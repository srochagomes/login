// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GetServerSidePropsContext } from 'next';
import accessManagerAPI from '@/infra/api/auth/AccessManager';

import refreshTokenRepository from '@/infra/repository/cookies/RefreshTokenRepository';
import type { NextApiRequest, NextApiResponse } from 'next'
import accessTokenRepository from '@/infra/repository/cookies/AccessTokenRepository';
import { decryptData } from '@/util/CryptoValue';

type Data = {
  name: string
}


const controllers = {
  async login(req: NextApiRequest, res: NextApiResponse<ICredentialData | IErrorMessage>) {
    
    console.log('method Login');
    let client_id = process.env.APP_CLIENT_ID;
    let client_secret = process.env.APP_CLIENT_SECRET;
    
    let data = process.env.NEXT_PUBLIC_KEY_CRIPTO;

    if(!data){
      throw new Error('Key encript should be informed.');
    }

    let credential = {
      client_id,
      client_secret,
      ...req.body,
      grant_type: "password",
      scope: "roles email openid"  
    }

    credential.password = decryptData(credential.password, data);

    let apiReturn : IAPIReturn = await accessManagerAPI.getCredentialAccess(credential);

    
    let refresh_token_id = process.env.REFRESH_TOKEN_USER;

    if (!refresh_token_id){
      throw new Error('Refresh token id not found');
    }
    
    if (apiReturn?.data?.refresh_token){
      refreshTokenRepository.save(refresh_token_id, apiReturn.data.refresh_token, res);
      //remover o refreshtoken por segurança
    
      delete apiReturn.data.refresh_token;
    }
    
    
    return res.status(apiReturn.status).json({
      ...apiReturn.data,
    });
  }
  
}


const controllerBy = {
  POST: controllers.login,
  OPTIONS: (_: NextApiRequest, res: NextApiResponse) => res.send('OK'),
}



//request entry
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse, 
  ctx: GetServerSidePropsContext
) {
  
  console.log('Servidor recebendo informação');
  let method = req?.method?.toUpperCase();
  let keyObject = method as keyof typeof controllerBy;
  
  if (method && controllerBy[keyObject]) {
    return controllerBy[keyObject](req, res);
  }

  return res.status(404).json({
    status: 404,
    message: 'Not Found'
  });
}
