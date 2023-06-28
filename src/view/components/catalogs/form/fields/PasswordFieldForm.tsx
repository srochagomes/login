import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { useState } from "react";




export default function PasswordFieldForm( props:any){
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    
    
    return (<>
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">{props.label}</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
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
                      value={props.dataForm[props.name as keyof typeof props.dataForm]}
                      onChange={props.handleChangeFunction}                      
                      required={(props.requiredFill)?true:false}
                      error= {!props.isValidFormFunction()}
                      
                    />
                    <FormHelperText id="component-error-text">{props.dataFormErrors[props.name as keyof typeof props.dataFormErrors]}</FormHelperText>
                  </FormControl>  
                </Grid>

    </>)
}