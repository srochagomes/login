import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import PrincipalAppBar from '@/view/layout/app-bar/PrincipalAppBar';
import PrincipalFooter from '@/view/layout/footer/PrincipalFooter';
import LoginDialog from '../screens/dialogs/LogingDialog';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialogLogin } from '@/store/reducers/dialogs/LoginState';


interface LinkProps {
    children?: any;
}

const PrincipalLayout = ({children}:LinkProps) => { 
    const [openLoginDialog, setOpenLoginDialog] = React.useState(false);
    const loginDialog = useSelector((state:any) => state.loginDialogState);
    const dispatch = useDispatch();    

    useEffect(() => {
        setOpenLoginDialog(loginDialog.open)
      }, [loginDialog.open])


   
    const oncloseWindow = () => {
        dispatch(closeDialogLogin);    
    };
        
    
    
    return (
    <>
        <Grid container spacing={0}>                
            <PrincipalAppBar/>
            <Grid>
                {children}
            </Grid>
            <PrincipalFooter/>
        </Grid>
        <LoginDialog openWindow={openLoginDialog} oncloseWindow={oncloseWindow}/>
    </>
)};

export default PrincipalLayout;