// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import accessManager from '@/infra/api/auth/AccessManager';
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

    let apiReturn : IAPIReturn = await accessManager.getCredentialAccess(credential);

    console.log('data:', apiReturn);


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
  res: NextApiResponse
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
