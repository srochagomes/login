import { Grid, TextField } from "@mui/material";
import React, { Children, ReactElement, cloneElement } from "react";



export default function CustomAreaForm( props:any){
    const {children } = props;

    
    props.validParent[props.name as keyof typeof props.validParent] = ()=>{
        return true;
    }


    

    return (<>
            <Grid container  justifyContent="center"  alignItems="center">
                {children}                
            </Grid>
    </>)
}