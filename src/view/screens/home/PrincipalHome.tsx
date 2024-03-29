import { useRouter } from 'next/router';

import { Inter } from 'next/font/google'
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import applicationSession from '@/domain/session/ApplicationSession';
import { useEffect } from 'react';
import { verifyUserLogged } from '@/store/reducers/UserLoggedState';
import { openDialogLogin, openDialogEmailAccountConfirmed } from '@/store/reducers/dialogs/LoginState';
import loginSocialRedirect from '@/util/LoginSocialRedirect';
import userSession from '@/domain/session/UserSession';
import { HttpStatusCode } from 'axios';

const inter = Inter({ subsets: ['latin'] })





export default function PrincipalHome() {
    const userLogged = useSelector((state:any) => state.userLoggedState);
    const loginDialog = useSelector((state:any) => state.loginDialogState);
    const router = useRouter();
    const { pathname, query } = router;
    let { requiredUser, emailConfirmed, socialLogin, code } = query;    
    
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(verifyUserLogged());
    }, [])

    useEffect(() => {      
      
      if (requiredUser){
        dispatch(openDialogLogin());
        delete query.requiredUser;    
        router.replace({
          pathname,
          query
        });
      };
      if(emailConfirmed){
           
        dispatch(openDialogEmailAccountConfirmed({key:query.emailConfirmed})); 
        delete query.emailConfirmed;
        router.replace({
          pathname,
          query
        });
      }

      if (socialLogin && code){
        
        loginSocialHandler(code as string);  

        delete query.socialLogin;
        delete query.code;
        router.replace({
          pathname,
          query
        });

      }

            
    }, [requiredUser, emailConfirmed, socialLogin, code])


    const loginSocialHandler = (codeData:string)=>{
      
      let user : IUserAuth = {
        code: codeData,
        redirect_uri: loginSocialRedirect.getUrl()
      }

  
      userSession.register(user)
            .then((body)=>{            
              if (body.status !== HttpStatusCode.Ok){
              //    if (body.status == HttpStatusCode.Unauthorized) 
              //       //setMessageLogin('Usuário e/ou senha invalido!');
              //    else if (body.status == HttpStatusCode.Forbidden) 
              //       //setMessageLogin('Usuário não pode acessar!');
              //    else 
              //       //setMessageLogin(body?.data?.description);
                console.log('Erro no login Social',body);
              }else{             
                dispatch(verifyUserLogged());
                //handleClose();
              }
            });   
    }

    applicationSession.register().then((obj)=>{
      console.log("Aplicação registrada");
    });

    

  return (
    <>      
        <Box
      sx={{
        width: 2600,
        height: 2300,
        backgroundColor: '#fff'
          }}
        >
              

      </Box>
     
    </>
  )
}
