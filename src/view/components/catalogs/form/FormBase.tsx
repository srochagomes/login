import { Grid } from "@material-ui/core";
import React, { Children, ReactElement, cloneElement } from "react";

interface FormProps {
    tag?: 'main' | 'div' | 'article' | 'section' | 'ul' | string;
    children?: React.ReactNode;
    styleSheet?: StyleSheet;
    dataForm: any;    
    dataFormErrors: any;
    isValidFormFunction: ()=>Boolean;
    handleChangeFunction: (event: React.ChangeEvent<HTMLInputElement>)=>void;

  }
  

export default function FormBase(props: FormProps){
    const {children } = props;
    const {dataForm, dataFormErrors, isValidFormFunction, handleChangeFunction  } = props;

    return (
        <Grid container spacing={2} justifyContent="center"  alignItems="center" >                
            {React.Children.map(children, (child) => {
                        if (React.isValidElement<any>(child)) {
                            return React.cloneElement<any>(child, {...props,...child.props,children,dataForm, dataFormErrors, isValidFormFunction, handleChangeFunction  });
                        }
                        return child;
                })}
        </Grid>            
        );
}

