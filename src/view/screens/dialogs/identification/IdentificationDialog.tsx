import * as React from 'react';
import Dialog from '@mui/material/Dialog';

import { useSelector, useDispatch } from 'react-redux';

import { closeDialogLogin} from '@/store/reducers/dialogs/LoginState';

import LoginDialog from './LogingDialog';
import NewAccountDialog from './NewAccountDialog';


export enum IndentificationScreenType {
    LOGIN,
    NEWACCOUNT
  }


export default function IdentificationDialog() {
  
  const loginDialog = useSelector((state:any) => state.loginDialogState);   
  
  const [open, setOpen] = React.useState(false);  
  const [screenTypeState, setScreenTypeState] = React.useState(IndentificationScreenType.LOGIN); 
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    setOpen(loginDialog.open);
    setScreenTypeState(loginDialog.screenType)
    
  }, [loginDialog.open,loginDialog.screenType]);
  
  const handleClose = () => {    
    dispatch(closeDialogLogin());        
  };

  
  const formIdentity = (screenTypeState === IndentificationScreenType.LOGIN?
                    <LoginDialog />
                    :(screenTypeState === IndentificationScreenType.NEWACCOUNT?
                    <NewAccountDialog />
                    :<></>))

  return (
    <div>      
      
        <Dialog open={open} onClose={handleClose} > 
            {formIdentity}
        </Dialog>
    </div>
  );
}