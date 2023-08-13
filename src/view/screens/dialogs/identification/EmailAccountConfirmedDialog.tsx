import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Alert from '@mui/material/Alert';
import DialogTitle from '@mui/material/DialogTitle';



import { HttpStatusCode } from 'axios';
import {makeStyles } from '@mui/styles';


import { useDispatch } from 'react-redux';

import { closeDialogLogin} from '@/store/reducers/dialogs/LoginState';
import account from '@/domain/account/Account';
import FormBase from '@/view/components/catalogs/form/FormBase';
import TextFieldForm from '@/view/components/catalogs/form/fields/TextFielForm';
import ButtonForm from '@/view/components/catalogs/form/button/ButtonForm';
import PasswordFieldForm from '@/view/components/catalogs/form/fields/PasswordFieldForm';
import { encryptData } from '@/util/CryptoValue';
import userSession from '@/domain/session/UserSession';
import { verifyUserLogged } from '@/store/reducers/UserLoggedState';

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

interface EmailAccountConfirmeProps {
  keyConfirmedEmail?: string;
}


export default function EmailAccountConfirmedDialog(props:EmailAccountConfirmeProps) {
  const classes = useStyles();  
  const {keyConfirmedEmail}  =  props;
  const [messageNewAccount, setMessageNewAccount] = React.useState('');
  const [accountCreateSuccess, setAccountCreateSuccess] = React.useState(false);  
  const dispatch = useDispatch();


  console.log('Valor key 2',keyConfirmedEmail);
  

  const handleAccessConfirm = (dataForm:any) => {     
      
      
      let accessConfirm : IAccessConfirm = {
        key: keyConfirmedEmail,
        value: dataForm.password
      }
      
      
      account.confirmAccess(accessConfirm)
      .then((body)=>{            
        if (body.status !== HttpStatusCode.Ok){
          if (body.status == HttpStatusCode.Unauthorized) 
            setMessageNewAccount('Aplicação não pode confirmar o acesso!');
          else if (body.status == HttpStatusCode.Forbidden) 
            setMessageNewAccount('Aplicação não pode confirmar o acesso!');
          else {            
            setMessageNewAccount(body?.data?.message);            
          }
          
        }else{
          
          let data = process.env.NEXT_PUBLIC_KEY_CRIPTO;
          if(!data){
            throw new Error('Key encript should be informed.');
          }

          let user : IUserAuth = {
            username: body?.data?.userLogin,
            password: encryptData(dataForm.password, data)
          }

          
      
          userSession.register(user)
                .then((body)=>{            
                  if (body.status !== HttpStatusCode.Ok){
                     if (body.status == HttpStatusCode.Unauthorized) 
                     setMessageNewAccount('Usuário e/ou senha invalido!');
                     else if (body.status == HttpStatusCode.Forbidden) 
                     setMessageNewAccount('Usuário não pode acessar!');
                     else 
                     setMessageNewAccount(body?.data?.description);
                  }else{
                    dispatch(verifyUserLogged());
                    handleClose();
                  }
                });  
          
          
        }
      });    
  };


  const handleClose = () => {        
    dispatch(closeDialogLogin());
  };


  

  
  
  return (
    <div>      
        <DialogTitle className={classes.myDialogTitle}> Cadastre sua senha</DialogTitle>        
        <DialogContent sx={{ marginTop: '30px' }}>
          <FormBase applyOnValidForm={handleAccessConfirm}>          

                  <PasswordFieldForm 
                    sx={{ marginTop: '5px' }}
                    fullWidth
                    name="password" 
                    label='Senha'
                    requiredFill/>
                 <TextFieldForm 
                      type="password"
                      name="passwordConfirmed" 
                      label="Password Confirm"
                      fullWidth
                      compareValueWith={{name:'password', label:'Senha'}}
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
