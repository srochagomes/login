import { Checkbox, FormHelperText, Grid } from "@mui/material";
import React from "react";




export default function CheckBoxFieldForm( props:any){
    const [checked, setChecked] =  React.useState(false);

    const {requiredTrue} = props;

    React.useEffect(() => {
        setChecked(checked);    
        
      }, [checked]);
    
    props.validParent[props.name as keyof typeof props.validParent] = ()=>{
        props.registerError(props.name, null);              
        let value = props.dataForm[props.name as keyof typeof props.dataForm];        
        
        if ((requiredTrue && (!value || value!='true'))) {      
            props.registerError(props.name, 'É obrigatória a selecção');            
            return false
        }
        
        return true;
      }
  
      
  
    const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        const valueBoolean = !checked;
        
        event.target.value =  String(valueBoolean)
        setChecked(valueBoolean)
        
        props.handleChange(event);
        
        
    };

    return (<>
        <Grid container direction="row" >
            <Grid item xs={1}>
                <Checkbox 
                name={props.name}                    
                value={props.content(props.name)}
                checked={checked}
                onChange={handleChangeChecked}  />                
            </Grid>
            <Grid item xs={11}>
                {props.componentDescription}            
                <FormHelperText error={props.hasError(props.name)} id="component-error-text">{props.showError(props.name)}</FormHelperText>
            </Grid>
        </Grid>
    </>)
}