import { Grid, TextField } from "@mui/material";




export default function TextFieldForm( props:any){
    return (<>
        <Grid item xs={12}>                
            <TextField
                        fullWidth
                        variant="outlined"
                        name={props.name}
                        type={props.type == null ? 'text':props.type}
                        label={props.label}
                        value={props.dataForm[props.name as keyof typeof props.dataForm]}
                        onChange={props.handleChangeFunction}                      
                        required={(props.requiredFill)?true:false}
                        error= {!props.isValidFormFunction()}
                        helperText={props.dataFormErrors[props.name as keyof typeof props.dataFormErrors]}
                        

                    />
        </Grid>
    </>)
}