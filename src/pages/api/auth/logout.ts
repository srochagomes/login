// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GetServerSidePropsContext } from 'next';
import accessManagerAPI from '@/infra/api/auth/AccessManager';

import refreshTokenRepository from '@/infra/repository/cookies/RefreshTokenRepository';
import type { NextApiRequest, NextApiResponse } from 'next'
import accessTokenRepository from '@/infra/repository/cookies/AccessTokenRepository';
import { decryptData } from '@/util/CryptoValue';
import refreshTokenStoreService from '@/domain/auth/RefreshTokenStoreService';
import { HttpStatusCode } from 'axios';

type Data = {
  name: string
}


const controllers = {
  async logout(req: NextApiRequest, res: NextApiResponse<ICredentialData | IErrorMessage>) {
    
    refreshTokenStoreService.logoutUser(res);          

     return res.status(HttpStatusCode.Ok).json({
      status: 200,
      message: 'deleted'
    });
  }
  
}


const controllerBy = {
  DELETE: controllers.logout,
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
