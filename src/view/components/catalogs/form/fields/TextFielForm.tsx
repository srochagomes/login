import { Grid, TextField } from "@mui/material";
import React from "react";




export default function TextFieldForm( props:any){

    const {requiredFill, emailValid, compareValueWith} = props;

    props.validParent[props.name as keyof typeof props.validParent] = ()=>{
        
        props.registerError(props.name, null);              
        let value = props.dataForm[props.name as keyof typeof props.dataForm];
        console.log("valores ",props.name,value);
               
        if ((requiredFill && (!value || !value.trim()))) {      
            props.registerError(props.name, 'Campo obrigatório');            
            return false
        }
        
        if (emailValid && !/\S+@\S+\.\S+/.test(value)) {    
            props.registerError(props.name, 'Email inválido');              
            return false
        } 
                
        if (compareValueWith != null) {      
            let valueToCompare = props.dataForm[compareValueWith.name as keyof typeof props.dataForm];
            console.log("Valores",value,valueToCompare);
            if (value != valueToCompare){
                console.log("ENTROU",value,valueToCompare);
                props.registerError(props.name, `Valor é diferente ao informado em ${compareValueWith.label}`);            
                return false
            }
            
            
        }


        
        return true;
    }
  

    return (<>
        <Grid item xs={12}>                
            <TextField
                        fullWidth
                        variant="outlined"
                        name={props.name}
                        type={props.type == null ? 'text':props.type}
                        label={props.label}
                        value={props.dataForm[props.name as keyof typeof props.dataForm]}
                        onChange={props.handleChange}                      
                        required={(props.requiredFill)?true:false}
                        error= {props.hasError(props.name)}
                        helperText={props.showError(props.name)}
                    />
        </Grid>
    </>)
}