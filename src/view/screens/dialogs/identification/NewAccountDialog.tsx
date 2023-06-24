import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Alert from '@mui/material/Alert';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, makeStyles } from '@material-ui/core';

import Link from '@mui/material/Link';

import { encryptData } from '@/util/CryptoValue';
import { useDispatch } from 'react-redux';
import { verifyUserLogged } from '@/store/reducers/UserLoggedState';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import userSession from '@/domain/session/UserSession';
import { HttpStatusCode } from 'axios';
import { Typography } from '@mui/material';

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
  oncloseWindow: () => void;
  goToDialog: () => void;
}

export default function NewAccountDialog(props:Props) {
  const classes = useStyles();  
  
  const [formValidated, setFormValidated] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [nome, setNome] = React.useState('');  
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');
  const [messageLogin, setMessageLogin] = React.useState('');
  const dispatch = useDispatch();
  const {oncloseWindow, goToDialog} = props;

  const clearData = () => {
    setEmail('');
    setPassword('')
    setMessageLogin('');
    startData()
  };

  const startData = () => {
    setMessageLogin('');
    setFormValidated(false);
  };


  const handleNome = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
    startData();
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    startData();
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    startData();
  };
  const handlePasswordConfirmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(event.target.value);
    startData();
  };

  const handleLogin = () => {    
    setFormValidated(true)
    
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
              oncloseWindow();
            }
          });    
    
      
  };


  const handleClose = () => {    
    oncloseWindow();
  };

  const isValidName = () => {    
    if (nome !== ""){
      return true;
    }

    return false;
  };

  

  const handleLoginSocial = (provider:string) => {
    // TODO: Implement login logic with social provider

    handleClose();
  };
  
  const termAcceptComponent = <>
  
    <Checkbox onChange={handlePasswordConfirmChange}/>
    <Grid item xs={12}>
      <Typography variant="body2" gutterBottom>
      <div><span>LI E ACEITO OS </span>
        
      <Link
          component="button"
          variant="caption"
          onClick={()=>goToDialog()}>
         TERMOS E CONDIÇÕES DE USO 
      </Link>
      
      <span> E </span>
      <Link
          component="button"
          variant="caption"
          onClick={()=>goToDialog()}>
        POLÍTICAS DE PRIVACIDADE DA PLATAFORMA
      </Link>
      </div>
      </Typography>
    </Grid>
  </>


  return (
    <div>      
        <DialogTitle className={classes.myDialogTitle}> Crie uma conta</DialogTitle>        
        <DialogContent>
        
          <Grid container spacing={2} justifyContent="center"  alignItems="center">                
                
                <Grid item xs={12}>
                    </Grid>
                <Grid item xs={12}>
                
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Nome"                    
                    value={nome}
                    onChange={handleNome}                      
                    required
                    error= {formValidated && !isValidName()}
                    helperText={formValidated && !isValidName()?"Erro":""}

                />
                </Grid>
              <Grid item xs={12}>
                
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Email"
                    required
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
                    required
                    value={password}
                    onChange={handlePasswordChange}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    fullWidth
                    variant="outlined"
                    type="password"
                    label="Password Confirm"
                    required
                    value={passwordConfirm}
                    onChange={handlePasswordConfirmChange}
                />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel                    
                    control={termAcceptComponent}
                    required
                    label=""
                    labelPlacement="end"
                  />
                </Grid>
                

                <Grid item xs={12}>
                <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
                    Cadastrar
                </Button>                
                </Grid>
                <Grid item>
                    Já tenho uma conta. <Link
                                  component="button"
                                  variant="body2"
                                  onClick={()=>goToDialog()}>
                                Realizar o meu Login!
                              </Link>
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