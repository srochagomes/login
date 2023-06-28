import { Button, Grid, TextField } from "@mui/material";




export default function ButtonForm( props:any){

    const handleClick = () => {        
        console.log('Ola');
    }

    return (<>
        <Grid item xs={12}>
        <Button variant="contained" color="primary" fullWidth onClick={handleClick}>
            {props.label}
        </Button>                
    </Grid>
    </>)
}