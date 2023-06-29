import { Button, Grid, TextField } from "@mui/material";




export default function ButtonForm( props:any){

    const handleClick = () => {                
        props.validForm();
    }

    const dynamicValue = Math.floor(Math.random() * 1000);
    const componentButtonId = `outlined-adornment-password-${dynamicValue}`;

    return (<>
        <Grid item xs={12}>
        <Button id={componentButtonId} variant="contained" color="primary" fullWidth onClick={handleClick}>
            {props.label}
        </Button>                
    </Grid>
    </>)
}