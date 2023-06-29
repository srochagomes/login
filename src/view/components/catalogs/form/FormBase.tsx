import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";

interface FormProps {    
    children?: React.ReactNode;
    styleSheet?: StyleSheet;
    isValidFormFunction: ()=>void;

  }
  

export default function FormBase(props: FormProps){
      const [dataForm, setDataForm] = React.useState({});
      const [dataFormErrors, setDataFormErrors] =  React.useState({});
      const {children } = props;

      
      let errors = {}
      let validParent = {}
    
      const registerError = (nameField:string,valueData:string) => {
          const newData =
          {  
              ...errors,
              [nameField]: valueData
          }  
          errors   = newData;
      }

      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = event.target;  
          console.log("click ",name, value);
          console.log("event ",event.target)
          let newData =
          {  ...dataForm,
              [name]: value}  
          
          setDataForm(newData);
      };

            
      const hasError = (nameField:string):boolean => {
          return dataFormErrors[nameField as keyof typeof dataFormErrors] != null
                && dataFormErrors[nameField as keyof typeof dataFormErrors] != '';
      }

      const showError = (nameField:string):string => {
          return dataFormErrors[nameField as keyof typeof dataFormErrors]
      }
      
      const validForm = () => {  
          const entries = Object.entries<() => boolean>(validParent);        
          entries.filter(([key, valueFunction]) => !valueFunction());
          setDataFormErrors(errors);        
      };


      const propsChanged = {dataForm, dataFormErrors, validParent, validForm, hasError, registerError, showError, handleChange, ...props}
      

      const modifiedChildren = React.Children.map(children, (child) => {
          if (React.isValidElement<FormProps>(child)) {
              return React.cloneElement<FormProps>(child, {...propsChanged,...child.props});
          }
          return child;
      });

      return (
          <Grid container spacing={2} justifyContent="center"  alignItems="center" >                
              {modifiedChildren}
          </Grid>            
          );
}

