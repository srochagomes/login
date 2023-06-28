import { Grid, TextField } from "@mui/material";




export default function CustomAreaForm( props:any){
    return (<>
            <Grid container  justifyContent="center"  alignItems="center">
                {props.children}
            </Grid>
    </>)
}