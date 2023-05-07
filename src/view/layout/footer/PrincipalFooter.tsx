import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

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