import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Alert from '@mui/material/Alert';
import DialogTitle from '@mui/material/DialogTitle';

import Link from '@mui/material/Link';

import {makeStyles } from '@mui/styles';

import { HttpStatusCode } from 'axios';
import { Grid, Typography  } from '@mui/material';


import { useDispatch } from 'react-redux';

import { closeDialogLogin, openDialogLogin} from '@/store/reducers/dialogs/LoginState';
import account from '@/domain/account/Account';
import FormBase from '@/view/components/catalogs/form/FormBase';
import TextFieldForm from '@/view/components/catalogs/form/fields/TextFielForm';
import CheckBoxFieldForm from '@/view/components/catalogs/form/fields/CheckBoxFieldForm';
import ButtonForm from '@/view/components/catalogs/form/button/ButtonForm';
import CustomAreaForm from '@/view/components/catalogs/form/custom/CustomAreaForm';
import applicationSession from '@/domain/session/ApplicationSession';


const useStyles = makeStyles((theme:any) => ({
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
  
  
  const [messageNewAccount, setMessageNewAccount] = React.useState('');
  const [accountCreateSuccess, setAccountCreateSuccess] = React.useState(false);
  const [emailSended, setEmailSended] = React.useState('');
  const dispatch = useDispatch();

  const handleNewAccount = (dataForm:any) => {   
    
    
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
      
  };


  const handleClose = () => {        
    dispatch(closeDialogLogin());
  };


  
  const termAcceptComponent = <div><span><Typography variant="caption" gutterBottom>LI E ACEITO OS </Typography>
                              <Link          
                                  variant="caption"
                                  onClick={()=>handleClose}>
                                <Typography variant="caption" gutterBottom>TERMOS E CONDIÇÕES DE USO </Typography>
                              </Link>
                              
                              
                              <span><Typography variant="caption" gutterBottom> E </Typography></span>
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
        <DialogContent sx={{ marginTop: '20px' }}>
          {accountCreateSuccess ?
            (<Grid container spacing={2}  justifyContent="center"  alignItems="center" direction="column">                
              <div>
              <div>
                <span><Typography variant="h6"  gutterBottom>Solicitação de criação de conta </Typography></span> 
              </div>
              <div>
                <span><Typography variant="h6"  gutterBottom>realizada com sucesso!. </Typography></span> 
              </div>
              
              <span><Typography variant="h6"  gutterBottom>Um e-mail será enviado para {emailSended}. </Typography></span> 
              </div> 
            </Grid>
          )
          :
          (<FormBase applyOnValidForm={handleNewAccount}>          

                  <TextFieldForm 
                    sx={{ marginTop: '5px' }}
                    fullWidth
                    name="name" 
                    label='Nome'
                    requiredFill/>
                 <TextFieldForm 
                      fullWidth
                      name="email" 
                      label="Email"
                      emailValid
                      requiredFill/>

                  <CheckBoxFieldForm 
                      name="termAccept" 
                      label="Termo"
                      componentDescription={termAcceptComponent}
                      requiredTrue/>

                  <ButtonForm
                    name="btn" 
                    label="Cadastrar"
                  />
                    
                    <CustomAreaForm name="customArea" >
                      <span><Typography variant="caption"  gutterBottom>Já tenho uma conta. </Typography></span> <span><Link
                                        component="button"
                                        variant="body2"
                                        onClick={()=>dispatch(openDialogLogin())}>
                                      <Typography variant="caption"  gutterBottom> Realizar o meu Login! </Typography>
                                    </Link></span>
                    </CustomAreaForm>
                      
          </FormBase>)}
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