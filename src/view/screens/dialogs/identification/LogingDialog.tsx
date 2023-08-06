import * as React from 'react';
import { useRouter } from 'next/router';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Alert from '@mui/material/Alert';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, makeStyles } from '@material-ui/core';
import { Divider } from '@mui/material';
import { Facebook, Google, LinkedIn } from '@mui/icons-material';

import Link from '@mui/material/Link';

import { encryptData } from '@/util/CryptoValue';
import { verifyUserLogged } from '@/store/reducers/UserLoggedState';


import userSession from '@/domain/session/UserSession';
import { HttpStatusCode } from 'axios';
import { IndentificationScreenType } from './IdentificationDialog';

import { useDispatch } from 'react-redux';

import { closeDialogLogin, openDialogNewAccount} from '@/store/reducers/dialogs/LoginState';
import loginSocialRedirect from '@/util/LoginSocialRedirect';


const useStyles = makeStyles((theme) => ({
  myDialogTitle: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.background.default,        
      textAlign: 'center',
      padding: theme.spacing(2),
      '& h2': theme.typography.h2
      
    },

  socialButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    borderRadius: '4px',
    boxShadow: 'none',
    opacity: 1,
    transitiontransition: 'background-color 0.2s ease-out, color 0.2s ease-out',
    '&:hover': {
      backgroundColor: '#ccc',
      color: '#fff',
    },
  },
  googleButton: {
    backgroundColor: '#EA4335',
    color: 'white',
    width: "50%"
  },
  facebookButton: {
    backgroundColor: '#3B5998',
    color: 'white',
    width: "50%"
  },
  linkedinButton: {
    backgroundColor: '#0077B5',
    color: 'white',
    width: "50%"
  },
}));





export default function LoginDialog() {
  const classes = useStyles();  
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [messageLogin, setMessageLogin] = React.useState('');
  const dispatch = useDispatch();

  

  const router = useRouter();

  let rootIDP = process.env.NEXT_PUBLIC_IDP_BASE_URL
  let urlLoginSocial = process.env.NEXT_PUBLIC_LOGIN_SOCIAL_START
  let clientId = process.env.NEXT_PUBLIC_APP_CLIENT_ID
  
  if (!rootIDP){
    throw new Error("NEXT_PUBLIC_IDP_BASE_URL not found to use");
  }

  if (!urlLoginSocial){
    throw new Error("NEXT_PUBLIC_LOGIN_SOCIAL_START not found to use");
  }

  if (!clientId){
    throw new Error("NEXT_PUBLIC_APP_CLIENT_ID not found to use");
  }


  urlLoginSocial = rootIDP+urlLoginSocial.replace(/{{clientId}}/g, clientId).replace(/{{urlRedirect}}/g, loginSocialRedirect.getUrl())
  

  const clearData = () => {
    setEmail('');
    setPassword('')
    setMessageLogin('');
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setMessageLogin('');
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setMessageLogin('');
  };

  const handleLogin = () => {    
    
    let data = process.env.NEXT_PUBLIC_KEY_CRIPTO;
    if(!data){
      throw new Error('Key encript should be informed.');
    }


    let user : IUserAuth = {
      username: email,
      password: encryptData(password, data)
    }

    userSession.register(user)
          .then((body)=>{            
            if (body.status !== HttpStatusCode.Ok){
               if (body.status == HttpStatusCode.Unauthorized) 
                setMessageLogin('Usuário e/ou senha invalido!');
               else if (body.status == HttpStatusCode.Forbidden) 
                setMessageLogin('Usuário não pode acessar!');
               else 
                setMessageLogin(body?.data?.description);
            }else{             
              dispatch(verifyUserLogged());
              handleClose();
            }
          });    
    
      
  };


  const handleClose = () => {  
    clearData()  
    dispatch(closeDialogLogin())
  };


  const handleLoginSocialStart = (provider:string) => {
    
    let urlLoginSocialIdentityProvider = urlLoginSocial?.replace(/{{identityProvider}}/g, provider)

    console.log('url-login-social', urlLoginSocialIdentityProvider)

    if (urlLoginSocialIdentityProvider){
      console.log('url login social',urlLoginSocialIdentityProvider);
      router.push(new URL(urlLoginSocialIdentityProvider));      
      handleClose();
    }
    
  };

  return (
    <div>      
        <DialogTitle className={classes.myDialogTitle}> Faça seu login</DialogTitle>        
        <DialogContent>
        
          <Grid container spacing={2} justifyContent="center"  alignItems="center">                
                
                <Grid item xs={12}>
                    </Grid>
              <Grid item xs={12}>
                
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Email"
                    value={email}
                    onChange={handleEmailChange}                    
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    fullWidth
                    variant="outlined"
                    type="password"
                    label="Password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                </Grid>
                <Grid item xs={12}>
                <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
                    Login
                </Button>                
                </Grid>
                <Grid item >
                    Não tenho conta. <Link
                                  component="button"
                                  variant="body2"
                                  onClick={()=>dispatch(openDialogNewAccount())}>
                                Cadastrar-me!
                              </Link>
                </Grid>
                <Grid item xs={12}>
                    <Divider  >
                        <div>or login with</div>
                    </Divider>
                </Grid>
                <Grid  container  direction="column"  justifyContent="center"  alignItems="center" >
                    
                        <Button
                            className={`${classes.socialButton} ${classes.googleButton}`}
                            startIcon={<Google/>}
                            onClick={() => handleLoginSocialStart('google')}>
                            Google
                        </Button>
                    
                    
                        <Button
                            className={`${classes.socialButton} ${classes.facebookButton}`}
                            startIcon={<Facebook/>}
                            onClick={() => handleLoginSocialStart('Facebook')}>
                            Facebook
                        </Button>
                    
                    
                        <Button
                            className={`${classes.socialButton} ${classes.linkedinButton}`}
                            startIcon={<LinkedIn/>}
                            onClick={() => handleLoginSocialStart('linkedin')}>
                            LinkedIn
                        </Button>
                    
                </Grid>
            </Grid>            
          
        </DialogContent>
        <DialogActions>
        
          
          {messageLogin && (
          <Alert    severity="error" color="error" sx={{ width: '100%', textAlign: 'left' }} >{messageLogin}</Alert>)}
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
    </div>
  );
}



