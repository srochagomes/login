import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Alert from '@mui/material/Alert';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from '@material-ui/core';
import Link from '@mui/material/Link';



import { HttpStatusCode } from 'axios';
import { Box, Grid, Typography } from '@mui/material';


import { useDispatch, useSelector } from 'react-redux';

import { closeDialogLogin, openDialogLogin} from '@/store/reducers/dialogs/LoginState';
import account from '@/domain/account/Account';
import FormBase from '@/view/components/catalogs/form/FormBase';
import TextFieldForm from '@/view/components/catalogs/form/fields/TextFielForm';
import CheckBoxFieldForm from '@/view/components/catalogs/form/fields/CheckBoxFieldForm';
import ButtonForm from '@/view/components/catalogs/form/button/ButtonForm';
import CustomAreaForm from '@/view/components/catalogs/form/custom/CustomAreaForm';
import applicationSession from '@/domain/session/ApplicationSession';
import PasswordFieldForm from '@/view/components/catalogs/form/fields/PasswordFieldForm';

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

interface EmailAccountConfirmeProps {
  keyConfirmedEmail?: string;
}


export default function EmailAccountConfirmedDialog(props:EmailAccountConfirmeProps) {
  const classes = useStyles();  
  const {keyConfirmedEmail}  =  props;
  const [messageNewAccount, setMessageNewAccount] = React.useState('');
  const [accountCreateSuccess, setAccountCreateSuccess] = React.useState(false);
  const [emailSended, setEmailSended] = React.useState('');
  const dispatch = useDispatch();


  console.log('Valor key 2',keyConfirmedEmail);
  

  const handleNewAccount = (dataForm:any) => {   
    
    if (true){
      let data = process.env.NEXT_PUBLIC_KEY_CRIPTO;
      if(!data){
        throw new Error('Key encript should be informed.');
      }
      let applicationData = applicationSession.getData();
      
      if(!applicationData){
        throw new Error('Application not identified, pleas, refresh the application.');
      }
      
      
      let newAccount : INewAccount = {
        application: applicationData.clientId,
        name: dataForm.name,
        username: dataForm.email,
        email: dataForm.email,
        termAccept: dataForm.termAccept
      }
      
      
      account.create(newAccount)
      .then((body)=>{            
        if (body.status !== HttpStatusCode.Created && body.status !== HttpStatusCode.Ok){
          if (body.status == HttpStatusCode.Unauthorized) 
            setMessageNewAccount('Aplicação não pode criar uma nova conta!');
          else if (body.status == HttpStatusCode.Forbidden) 
            setMessageNewAccount('Aplicação não pode criar uma nova conta!');
          else {            
            setMessageNewAccount(body?.data?.message);            
          }
          
        }else{             
          setEmailSended(dataForm.email);
          setAccountCreateSuccess(true);          
        }
      });    

    }
    
    
      
  };


  const handleClose = () => {        
    dispatch(closeDialogLogin());
  };


  

  
  
  return (
    <div>      
        <DialogTitle className={classes.myDialogTitle}> Cadastre sua senha</DialogTitle>        
        <DialogContent sx={{ marginTop: '30px' }}>
          <FormBase applyOnValidForm={handleNewAccount}>          

                  <PasswordFieldForm 
                    sx={{ marginTop: '5px' }}
                    fullWidth
                    name="password" 
                    label='Senha'
                    requiredFill/>
                 <PasswordFieldForm 
                      fullWidth
                      name="passwordConfirm" 
                      label="Confirme sua senha"
                      
                      requiredFill/>

                  <ButtonForm
                    name="btn" 
                    label="Atualizar"
                  />
                    
                      
          </FormBase>
        </DialogContent>
        <DialogActions>
        
        
                  
          {messageNewAccount && (
          <Alert    severity="error" color="error" sx={{ width: '100%', textAlign: 'left' }} >{messageNewAccount}</Alert>)}
          {accountCreateSuccess ?
              <Button id="closeNewAccountbtn" variant="contained" color="primary"  onClick={handleClose}>
                OK
              </Button>  :

              <Button onClick={handleClose} color="primary">
                          Cancel
              </Button>
          }
          
        </DialogActions>
    </div>
  );
}