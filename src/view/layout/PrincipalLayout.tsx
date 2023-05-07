import React from 'react';
import Grid from '@material-ui/core/Grid';
import PrincipalAppBar from '@/view/layout/app-bar/PrincipalAppBar';
import PrincipalFooter from '@/view/layout/footer/PrincipalFooter';


interface LinkProps {
    children?: any;
}

const PrincipalLayout = ({children}:LinkProps) => (
    <>
        <Grid container spacing={0}>                
            <PrincipalAppBar/>
            <Grid>
                {children}
            </Grid>
            <PrincipalFooter/>
        </Grid>
    </>
);

export default PrincipalLayout;