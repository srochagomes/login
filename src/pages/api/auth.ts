// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GetServerSidePropsContext } from 'next';
import accessManagerAPI from '@/infra/api/auth/AccessManagerAPI';

import refreshTokenRepository from '@/infra/repository/cookies/RefreshTokenRepository';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}


const controllers = {
  async login(req: NextApiRequest, res: NextApiResponse<ICredentialData | IErrorMessage>) {
    
    console.log('method Login');
    let client_id = process.env.APP_CLIENT_ID;
    let client_secret = process.env.APP_CLIENT_SECRET;
    
    let credential = {
      client_id,
      client_secret,

      ...req.body,
      grant_type: "password",
      scope: "roles email openid"  
    }

    let apiReturn : IAPIReturn = await accessManagerAPI.getCredentialAccess(credential);

    console.log('Refresh token API :', apiReturn.data.refresh_token );
    
    console.log('RefreshToken decriptografada :', refreshTokenRepository.get( req));
    refreshTokenRepository.save(apiReturn.data.refresh_token, res);


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
