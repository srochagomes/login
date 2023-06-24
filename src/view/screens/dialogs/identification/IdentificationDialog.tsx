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
import LoginDialog from './LogingDialog';
import { ReactElement } from 'react';
import NewAccountDialog from './NewAccountDialog';



interface Props{
    openWindow: boolean;    
}

enum ScreenType {
    LOGIN,
    NEWACCOUNT
  }


export default function IdentificationDialog(props:Props) {
  
  const loginDialog = useSelector((state:any) => state.loginDialogState);  
  const {openWindow} = props;
  
  
  const [open, setOpen] = React.useState(openWindow);  
  const [screenTypeState, setScreenTypeState] = React.useState(ScreenType.LOGIN);  

  const dispatch = useDispatch();
  
  React.useEffect(() => {
    setOpen(loginDialog.open);
    
  }, [loginDialog.open]);

  const openDialog = (screenType: ScreenType) => {    
    setScreenTypeState(screenType);
  };

  
  const handleClose = () => {    
    dispatch(closeDialogLogin());    
    setScreenTypeState(ScreenType.LOGIN);
  };

  
  const formIdentity = (screenTypeState === ScreenType.LOGIN?
                    <LoginDialog oncloseWindow={handleClose} goToDialog={()=>openDialog(ScreenType.NEWACCOUNT)}/>
                    :(
                    screenTypeState === ScreenType.NEWACCOUNT?
                    <NewAccountDialog oncloseWindow={handleClose} goToDialog={()=>openDialog(ScreenType.LOGIN)}/>
                    :
                    <></>))

  return (
    <div>      
      
        <Dialog open={open} onClose={handleClose} > 
            {formIdentity}
        </Dialog>
    </div>
  );
}