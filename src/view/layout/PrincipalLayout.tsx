import React from 'react';
import PrincipalAppBar from '@/view/layout/app-bar/PrincipalAppBar';
import PrincipalFooter from '@/view/layout/footer/PrincipalFooter';
import IdentificationDialog from '../screens/dialogs/identification/IdentificationDialog';
import { Grid } from '@mui/material';

    

interface LinkProps {
    children?: any;
}


const PrincipalLayout = ({children}:LinkProps) => {     
    
    return (
    <>
        <Grid container spacing={0}>                
            <PrincipalAppBar/>
            <Grid>
                {children}
            </Grid>
            <PrincipalFooter/>
        </Grid>
        <IdentificationDialog/>
    </>
)};


  

export default PrincipalLayout;

