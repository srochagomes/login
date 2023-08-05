// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GetServerSidePropsContext } from 'next';
import accessManagerAPI from '@/infra/api/auth/AccessManager';

import type { NextApiRequest, NextApiResponse } from 'next'
import { decryptData } from '@/util/CryptoValue';
import refreshTokenStoreService from '@/domain/auth/RefreshTokenStoreService';

type Data = {
  name: string
}

const createCredendials = (client_id:string, client_secret:string,  req: NextApiRequest): ICredentialAuth => {

  //When flow is by code
  if (req?.body?.code) {

    return {
      client_id,
      client_secret,
      ...req.body,
      grant_type: "authorization_code",
      scope: "roles email openid acr"  
    }

  }  

  //When flow is by password
  let data = process.env.NEXT_PUBLIC_KEY_CRIPTO;

  if(!data){
    throw new Error('Key encript should be informed.');
  }
  
  let credential =  {
    client_id,
    client_secret,
    ...req.body,
    grant_type: "password",
    scope: "roles email openid acr"  
  };

  credential.password = decryptData(credential.password, data);

  return credential;
}


const controllers = {
  async login(req: NextApiRequest, res: NextApiResponse<ICredentialData | IErrorMessage>) {
    

    let client_id = process.env.NEXT_PUBLIC_APP_CLIENT_ID;
    let client_secret = process.env.APP_CLIENT_SECRET;
    
    if (!client_id){
      throw new Error('Client ID should be informed.');
    }

    if (!client_secret){
      throw new Error('Secret should be informed.');
    }


    let credential = createCredendials(client_id, client_secret, req)
    
    
    let apiReturn : IAPIReturn = await accessManagerAPI.getCredentialAccess(credential);
    
    if (apiReturn?.data?.refresh_token){
      refreshTokenStoreService.toUser(apiReturn.data.refresh_token, res);          
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
