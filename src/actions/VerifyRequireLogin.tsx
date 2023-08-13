import { HttpStatusCode } from 'axios';
import { NextRouter } from 'next/router';

const verifyRequiredLogin = (useRouter:NextRouter, payload:IAPIReturn) => {
    
    if (payload.status !== HttpStatusCode.Ok && payload?.data?.requireLogin ){
        useRouter.push('/?requiredUser=true');
    }
    
}

export default verifyRequiredLogin;