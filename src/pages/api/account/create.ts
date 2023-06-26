// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GetServerSidePropsContext } from 'next';

import type { NextApiRequest, NextApiResponse } from 'next'
import { decryptData } from '@/util/CryptoValue';
import accountManager from '@/infra/api/account/AccountManager';
import refreshTokenStoreService from '@/domain/auth/RefreshTokenStoreService';

type Data = {
  name: string
}


const controllers = {
  async create(req: NextApiRequest, res: NextApiResponse<ICredentialData | IErrorMessage>) {
    
    let data = process.env.NEXT_PUBLIC_KEY_CRIPTO;

    if(!data){
      throw new Error('Key encript should be informed.');
    }

    console.log("Body enviado"+req.body)
    let newAccount:INewAccount = {  
      
      ...req.body,      
    }

    newAccount.password = decryptData(newAccount.password, data);
    

    let apiReturn : IAPIReturn = await accountManager.createNew(newAccount);
    
    return res.status(apiReturn.status).json({
      ...apiReturn.data,
    });
  }
  
}


const controllerBy = {
  POST: controllers.create,
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
