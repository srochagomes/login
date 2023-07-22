import * as React from 'react';
import Dialog from '@mui/material/Dialog';

import { useSelector, useDispatch } from 'react-redux';

import { closeDialogLogin} from '@/store/reducers/dialogs/LoginState';

import LoginDialog from './LogingDialog';
import NewAccountDialog from './NewAccountDialog';
import EmailAccountConfirmedDialog from './EmailAccountConfirmedDialog';


export enum IndentificationScreenType {
    LOGIN,
    NEWACCOUNT,
    CONFIRMACCOUNT
  }


export default function IdentificationDialog() {
  
  const loginDialog = useSelector((state:any) => state.loginDialogState);  

  
  const [open, setOpen] = React.useState(false);  
  const [screenTypeState, setScreenTypeState] = React.useState(IndentificationScreenType.LOGIN); 
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    setOpen(loginDialog.open);
    setScreenTypeState(loginDialog.screenType)
    console.log('Valor state',loginDialog);
    
  }, [loginDialog.open,loginDialog.screenType]);
  
  const handleClose = () => {    
    dispatch(closeDialogLogin());        
  };

  
  const formIdentity = (screenTypeState === IndentificationScreenType.LOGIN?
                    <LoginDialog />
                    :(screenTypeState === IndentificationScreenType.NEWACCOUNT?
                    <NewAccountDialog />
                    :(screenTypeState === IndentificationScreenType.CONFIRMACCOUNT?
                      <EmailAccountConfirmedDialog keyConfirmedEmail={loginDialog.key}/>
                    :<></>)))

  return (
    <div>      
      
        <Dialog open={open} onClose={handleClose} > 
            {formIdentity}
        </Dialog>
    </div>
  );
}