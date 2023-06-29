import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { useState } from "react";




export default function PasswordFieldForm( props:any){
    const [showPassword, setShowPassword] = useState(false);
    const {requiredFill} = props;

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    
    props.validParent[props.name as keyof typeof props.validParent] = ()=>{
      props.registerError(props.name, null);              
      let value = props.dataForm[props.name as keyof typeof props.dataForm];
      

      if ((requiredFill && (!value || !value.trim()))) {      
          props.registerError(props.name, 'Campo obrigatório');            
          return false
      }
      
      return true;
    }

    const dynamicValue = Math.floor(Math.random() * 1000);
    const componentLabelId = `outlined-adornment-password-${dynamicValue}`;
    const componentErrorlId = `component-error-text-${dynamicValue}`;

    
    
    return (<>
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor={componentLabelId}>{props.label}</InputLabel>
                    <OutlinedInput
                      id={componentLabelId}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      
                      
                      label={props.label}
                      name={props.name}
                      value={props.content(props.name)}
                      onChange={props.handleChange}                      
                      required={(props.requiredFill)?true:false}
                      error= {props.hasError(props.name)}                      

                      aria-describedby={componentErrorlId}
                    />
                    <FormHelperText error={props.hasError(props.name)} id={componentErrorlId}>{props.showError(props.name)}</FormHelperText>
                  </FormControl>  
                </Grid>

    </>)
}