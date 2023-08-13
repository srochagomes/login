import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

const PrincipalFooter = () => (    
  <AppBar position="static" color="primary" component="footer">
    <Toolbar>
      <Typography variant="body1" color="inherit">
        © 2023 Meu App. Todos os direitos reservados.
      </Typography>
    </Toolbar>
  </AppBar>
);

export default PrincipalFooter;