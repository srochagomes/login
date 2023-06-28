import { Checkbox, FormHelperText, Grid, TextField } from "@mui/material";




export default function CheckBoxFieldForm( props:any){
    return (<>
        <Grid container direction="row" >
            <Grid item xs={1}>
                <Checkbox 
                name={props.name}                    
                value={props.dataForm[props.name as keyof typeof props.dataForm]}
                onChange={props.handleChangeFunction}  />
                <FormHelperText id="component-error-text">{props.dataFormErrors[props.name as keyof typeof props.dataFormErrors]}</FormHelperText>
            </Grid>
            <Grid item xs={11}>
                {props.componentDescription}            
            </Grid>
        </Grid>
    </>)
}