// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GetServerSidePropsContext } from 'next';
import accessManagerAPI from '@/infra/api/auth/AccessManager';

import type { NextApiRequest, NextApiResponse } from 'next'
import refreshTokenStoreService from '@/domain/auth/RefreshTokenStoreService';

type Data = {
  name: string
}


const controllers = {
  async login(req: NextApiRequest, res: NextApiResponse<ICredentialData | IErrorMessage>) {    
    
    let client_id = process.env.NEXT_PUBLIC_APP_CLIENT_ID;
    let client_secret = process.env.APP_CLIENT_SECRET;
    if (!client_id){
      throw new Error('Client id not configured.');
    }
    if (!client_secret){
      throw new Error('Client secret not configured.');
    }
    
    let credential = {
      client_id,
      client_secret,      
      grant_type: "client_credentials",
      scope: "roles openid"  
    }

    let apiReturn : IAPIReturn = await accessManagerAPI.getCredentialAccess(credential);
    
    if (apiReturn?.data?.refresh_token){
      refreshTokenStoreService.toApp(apiReturn.data.refresh_token, res);
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
