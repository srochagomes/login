import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grig from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, makeStyles } from '@material-ui/core';
import { Divider, IconButton, InputAdornment } from '@mui/material';
import { AccountCircle, Facebook, Google, LinkedIn } from '@mui/icons-material';

import theme from '@/view/themes/PrincipalTheme';
import { FocusTrap } from '@mui/base';
import Link from '@/view/components/catalogs/links/Link';

import { encryptData } from '@/util/CryptoValue';
import { useSelector, useDispatch } from 'react-redux';
import { verifyUserLogged } from '@/store/reducers/UserLoggedState';

import { closeDialogLogin} from '@/store/reducers/dialogs/LoginState';

import userSession from '@/domain/session/UserSession';
import { HttpStatusCode } from 'axios';


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


interface Props{
    openWindow: boolean;
    oncloseWindow: () => void;
}

export default function LoginDialog(props:Props) {
  const userLogged = useSelector((state:any) => state.userLoggedState);
  const loginDialog = useSelector((state:any) => state.loginDialogState);
  const dispatch = useDispatch();
  
  const {openWindow, oncloseWindow} = props;
  
  const classes = useStyles();  
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [messageLogin, setMessageLogin] = React.useState('');
  
  const [open, setOpen] = React.useState(openWindow);  

  const clearData = () => {
    setEmail('');
    setPassword('')
    setMessageLogin('');
  };
  
  React.useEffect(() => {
    setOpen(loginDialog.open);
    clearData();    
  }, [loginDialog.open]);


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

  const handleLoginSocial = (provider:string) => {
    // TODO: Implement login logic with social provider

    handleClose();
  };

  
  const handleClose = () => {    
    dispatch(closeDialogLogin());
  };

  return (
    <div>      
      
      <Dialog open={open} onClose={handleClose}>        
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
                <Grid item>
                    Não tenho conta. <Link href={'sdsds'}>Cadastrar-me!</Link> 
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
                            onClick={() => handleLoginSocial('Google')}>
                            Google
                        </Button>
                    
                    
                        <Button
                            className={`${classes.socialButton} ${classes.facebookButton}`}
                            startIcon={<Facebook/>}
                            onClick={() => handleLoginSocial('Facebook')}>
                            Facebook
                        </Button>
                    
                    
                        <Button
                            className={`${classes.socialButton} ${classes.linkedinButton}`}
                            startIcon={<LinkedIn/>}
                            onClick={() => handleLoginSocial('linkedin')}>
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
      </Dialog>
    </div>
  );
}