// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GetServerSidePropsContext } from 'next';
import accessManagerAPI from '@/infra/api/auth/AccessManager';

import refreshTokenRepository from '@/infra/repository/cookies/RefreshTokenRepository';
import type { NextApiRequest, NextApiResponse } from 'next'
import accessTokenRepository from '@/infra/repository/cookies/AccessTokenRepository';
import { decryptData } from '@/util/CryptoValue';
import refreshTokenStoreService from '@/domain/auth/RefreshTokenStoreService';

type Data = {
  name: string
}


const USER_TYPE:string = 'user';
const APP_TYPE:string = 'app';

const controllers = {
  
  async refresh(req: NextApiRequest, res: NextApiResponse<ICredentialData | IErrorMessage>) {
    

    let client_id = process.env.APP_CLIENT_ID;
    let client_secret = process.env.APP_CLIENT_SECRET;
    if (!client_id){
      throw new Error("APP_CLIENT_ID should be informed");
    }
    if (!client_secret){
      throw new Error("APP_CLIENT_SECRET should be informed");
    }

    let typeRefresh:string = req.body.type_refresh;   

    let refresh_token: string | null = typeRefresh===USER_TYPE? 
                                  refreshTokenStoreService.getOfUser(req) 
                                  : refreshTokenStoreService.getOfApp(req);
    
    console.log('refresh token ',refresh_token);

    let credential = {
      client_id,
      client_secret,
      refresh_token,      
      grant_type: "refresh_token"
    }
    

    let apiReturn : IAPIReturn = await accessManagerAPI.getRefreshCredentialAccess(credential);
    console.log('apiReturn : IAPIReturn = ',apiReturn);

    if (apiReturn?.data?.refresh_token){
      typeRefresh===USER_TYPE ?
        refreshTokenStoreService.toUser(apiReturn.data.refresh_token, res)
        :refreshTokenStoreService.toApp(apiReturn.data.refresh_token, res);
      delete apiReturn.data.refresh_token;
    }
    
    
    return res.status(apiReturn.status).json({
      type_refresh: typeRefresh===USER_TYPE?USER_TYPE:APP_TYPE,
      ...apiReturn.data,
    });
  }
  
}


const controllerBy = {
  POST: controllers.refresh,
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
