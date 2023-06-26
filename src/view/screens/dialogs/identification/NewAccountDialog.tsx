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

import { verifyUserLogged } from '@/store/reducers/UserLoggedState';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import userSession from '@/domain/session/UserSession';
import { HttpStatusCode } from 'axios';
import { Typography } from '@mui/material';


import { useDispatch } from 'react-redux';

import { closeDialogLogin, openDialogLogin} from '@/store/reducers/dialogs/LoginState';
import account from '@/domain/account/Account';


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




export default function NewAccountDialog() {
  const classes = useStyles();  
  
  const [formValidated, setFormValidated] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');  
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');
  const [messageLogin, setMessageLogin] = React.useState('');
  const [termAccept, setTermAccept] = React.useState(false);
  const dispatch = useDispatch();
  

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
    setName(event.target.value);
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

  const handleTermAcceptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTermAccept(Boolean(event.target.value));
    startData();
  };


  const handleNewAccount = () => {    
    setFormValidated(true)
    
    let data = process.env.NEXT_PUBLIC_KEY_CRIPTO;
    if(!data){
      throw new Error('Key encript should be informed.');
    }

    
    let newAccount : INewAccount = {
      application: "teste",
      name: name,
      username: email,
      email: email,
      password: encryptData(password, data),
      passwordConfirmed: encryptData(passwordConfirm, data),
      termAccept: termAccept
    }

    account.create(newAccount)
    .then((body)=>{            
      if (body.status !== HttpStatusCode.Ok){
         if (body.status == HttpStatusCode.Unauthorized) 
          setMessageLogin('Aplicação não pode criar uma nova conta!');
         else if (body.status == HttpStatusCode.Forbidden) 
          setMessageLogin('Aplicação não pode criar uma nova conta!');
         else 
          setMessageLogin(body?.data?.description);
      }else{             
        //dispatch(verifyUserLogged()); validar fluxo
        handleClose();
      }
    });    
      
  };


  const handleClose = () => {    
    clearData();  
    dispatch(closeDialogLogin());
  };

  const isValidName = () => {    
    if (name !== ""){
      return true;
    }

    return false;
  };

  

  
  const termAcceptComponent = <>
  
    <Checkbox onChange={handlePasswordConfirmChange}/>
    
      
      <div><span><Typography variant="body2" gutterBottom>LI E ACEITO OS </Typography></span>
        
      <Link
          component="button"
          variant="caption"
          onClick={()=>handleClose}>
         <Typography variant="body2" gutterBottom>TERMOS E CONDIÇÕES DE USO </Typography>
      </Link>
      
      <span> E </span>
      <Link
          component="button"
          variant="caption"
          onClick={()=>handleClose}>
        <Typography variant="body2" gutterBottom>POLÍTICAS DE PRIVACIDADE DA PLATAFORMA</Typography>
      </Link>
      </div>
      
    
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
                    value={name}
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
                <Grid container direction="row" xs={12}>
                                      
                    {termAcceptComponent}                    
                    
                </Grid>
                

                <Grid item xs={12}>
                <Button variant="contained" color="primary" fullWidth onClick={handleNewAccount}>
                    Cadastrar
                </Button>                
                </Grid>
                <Grid item>
                    Já tenho uma conta. <Link
                                  component="button"
                                  variant="body2"
                                  onClick={()=>dispatch(openDialogLogin())}>
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