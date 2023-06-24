import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import PrincipalAppBar from '@/view/layout/app-bar/PrincipalAppBar';
import PrincipalFooter from '@/view/layout/footer/PrincipalFooter';
import { useSelector } from 'react-redux';
import IdentificationDialog from '../screens/dialogs/identification/IdentificationDialog';


interface LinkProps {
    children?: any;
}

const PrincipalLayout = ({children}:LinkProps) => { 
    const [openLoginDialog, setOpenLoginDialog] = React.useState(false);
    const loginDialog = useSelector((state:any) => state.loginDialogState);

    useEffect(() => {
        setOpenLoginDialog(loginDialog.open)
      }, [loginDialog.open])
    
    return (
    <>
        <Grid container spacing={0}>                
            <PrincipalAppBar/>
            <Grid>
                {children}
            </Grid>
            <PrincipalFooter/>
        </Grid>
        <IdentificationDialog openWindow={openLoginDialog}/>
    </>
)};

export default PrincipalLayout;