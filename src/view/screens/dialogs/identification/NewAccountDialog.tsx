import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Alert from '@mui/material/Alert';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from '@material-ui/core';
import Link from '@mui/material/Link';

import { encryptData } from '@/util/CryptoValue';

import { verifyUserLogged } from '@/store/reducers/UserLoggedState';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import userSession from '@/domain/session/UserSession';
import { HttpStatusCode } from 'axios';
import { FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';


import { useDispatch } from 'react-redux';

import { closeDialogLogin, openDialogLogin} from '@/store/reducers/dialogs/LoginState';
import account from '@/domain/account/Account';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FormBase from '@/view/components/catalogs/form/FormBase';
import TextFieldForm from '@/view/components/catalogs/form/fields/TextFielForm';
import PasswordFieldForm from '@/view/components/catalogs/form/fields/PasswordFieldForm';
import CheckBoxFieldForm from '@/view/components/catalogs/form/fields/CheckBoxFieldForm';
import ButtonForm from '@/view/components/catalogs/form/button/ButtonForm';
import CustomAreaForm from '@/view/components/catalogs/form/custom/CustomAreaForm';

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
  
  
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');  
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');
  const [messageLogin, setMessageLogin] = React.useState('');
  const [termAccept, setTermAccept] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [dadosFormulario, setDadosFormulario] = React.useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    termAccept: false
  });
  const [errosFormulario, setErrosFormulario] =  React.useState({});
  const dispatch = useDispatch();
  

  const clearData = () => {
    setEmail('');
    setPassword('')
    setMessageLogin('');
    startData()
  };

  const startData = () => {
    setMessageLogin('');
    setErrosFormulario({});
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };


  const handleNewAccount = () => {        
    
    
    
    if (validForm()){
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

    }
    
    
      
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

  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    const { name, value } = event.target;    
    const newData = 
    {  ...dadosFormulario,
      [name]: value}  
    
    setDadosFormulario(newData);
  };
  

  const isValidForm = () => {
    return Object.keys(errosFormulario).length === 0;
  }

  const validForm = () => {    
    
    let errorData = {}



    const { name, email } = dadosFormulario;
    

    // Validar campo obrigatório do nome
    if (!name.trim()) {      
      errorData = {
        ...errorData,
        name: 'Campo obrigatório'
      }
    }

    // Validar campo obrigatório do e-mail
    if (!email.trim()) {
      errorData = {
        ...errorData,
        email: 'Campo obrigatório'
      }
      
      
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errorData = {
        ...errorData,
        email: 'E-mail inválido'
      }
    }

    setErrosFormulario(errorData);    
    console.log("Valor erro ", Object.keys(errosFormulario))
    console.log("Valor erro tamanho", Object.keys(errosFormulario).length)
    console.log("função ", isValidForm())
    return Object.keys(errorData).length === 0 ;
  };


  
  const termAcceptComponent = <div><span><Typography variant="caption" gutterBottom>LI E ACEITO OS </Typography>
                              <Link          
                                  variant="caption"
                                  onClick={()=>handleClose}>
                                <Typography variant="caption" gutterBottom>TERMOS E CONDIÇÕES DE USO </Typography>
                              </Link>
                              
                              <Typography variant="caption" gutterBottom> E </Typography>
                              <Link          
                                  variant="caption"
                                  onClick={()=>handleClose}>
                                <Typography variant="caption" gutterBottom>POLÍTICAS DE PRIVACIDADE DA PLATAFORMA</Typography>
                              </Link>
                              </span>
                              </div>  
  
  
  return (
    <div>      
        <DialogTitle className={classes.myDialogTitle}> Crie uma conta</DialogTitle>        
        <DialogContent>
          <FormBase dataForm={dadosFormulario}
                    dataFormErrors={errosFormulario}
                    isValidFormFunction={isValidForm}
                    handleChangeFunction={handleChange}>
          

                  <TextFieldForm 
                    name="name" 
                    label='Nome'
                    requiredFill/>
                 <TextFieldForm 
                      name="email" 
                      label="Email"
                      requiredFill/>

                  <PasswordFieldForm
                    name="password" 
                    label="Password"
                    requiredFill
                  />
                  <TextFieldForm 
                      name="passwordConfirmed" 
                      label="Password Confirm"
                      requiredFill/>

                  <CheckBoxFieldForm 
                      name="passwordConfirmed" 
                      label="Password Confirm"
                      componentDescription={termAcceptComponent}
                      requiredFill/>

                  <ButtonForm
                    label="Cadastrar"
                  />
                    
                      
          </FormBase>
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