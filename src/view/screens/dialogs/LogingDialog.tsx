import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grig from '@mui/material/Grid';

import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, makeStyles } from '@material-ui/core';
import { Divider, IconButton, InputAdornment } from '@mui/material';
import { AccountCircle, Facebook, Google, LinkedIn } from '@mui/icons-material';

import theme from '@/view/themes/PrincipalTheme';
import { FocusTrap } from '@mui/base';
import Link from '@/view/components/catalogs/links/Link';
import accessRequired from '@/domain/auth/AccessRequire';


const useStyles = makeStyles((theme) => ({
    myDialogTitle: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.background.default,        
        textAlign: 'center',
        padding: theme.spacing(2),
        '& h2': theme.typography.h2
        
      },

    socialButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: theme.spacing(1),
      padding: theme.spacing(1),
      borderRadius: '4px',
      boxShadow: 'none',
      opacity: 1,
      transitiontransition: 'background-color 0.2s ease-out, color 0.2s ease-out',
      '&:hover': {
        backgroundColor: '#ccc',
        color: '#fff',
      },
    },
    googleButton: {
      backgroundColor: '#EA4335',
      color: 'white',
      width: "50%"
    },
    facebookButton: {
      backgroundColor: '#3B5998',
      color: 'white',
      width: "50%"
    },
    linkedinButton: {
      backgroundColor: '#0077B5',
      color: 'white',
      width: "50%"
    },
  }));


interface Props{
    openWindow: boolean;
    oncloseWindow: () => void;
}

export default function LoginDialog(props:Props) {
  const {openWindow, oncloseWindow} = props;
  
  const classes = useStyles();  
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const [open, setOpen] = React.useState(openWindow);  
  
  React.useEffect(() => {
    setOpen(openWindow);
  }, [openWindow]);


  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // TODO: Implement login logic with email and password
    console.log('Email:', email);
    console.log('Password:', password);

    let user : IUserAuth = {
      username: email,
      password
    }

    accessRequired(user);
    handleClose();
  };

  const handleLoginSocial = (provider:string) => {
    // TODO: Implement login logic with social provider
    console.log('Login with', provider);
    handleClose();
  };

  
  const handleClose = () => {
    setOpen(false);
    oncloseWindow();
  };

  return (
    <div>      
      
      <Dialog open={open} onClose={handleClose}>        
        <DialogTitle className={classes.myDialogTitle}> Faça seu login</DialogTitle>        
        <DialogContent>
        
          <Grid container spacing={2} justifyContent="center"  alignItems="center">
                
                
                <Grid item xs={12}>
                    </Grid>
              <Grid item xs={12}>
                
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Email"
                    value={email}
                    onChange={handleEmailChange}                    
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    fullWidth
                    variant="outlined"
                    type="password"
                    label="Password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                </Grid>
                <Grid item xs={12}>
                <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
                    Login
                </Button>                
                </Grid>
                <Grid item>
                    Não tenho conta. <Link href={'sdsds'}>Cadastrar-me!</Link> 
                </Grid>
                <Grid item xs={12}>
                    <Divider  >
                        <div>or login with</div>
                    </Divider>
                </Grid>
                <Grid  container  direction="column"  justifyContent="center"  alignItems="center" >
                    
                        <Button
                            className={`${classes.socialButton} ${classes.googleButton}`}
                            startIcon={<Google/>}
                            onClick={() => handleLoginSocial('Google')}>
                            Google
                        </Button>
                    
                    
                        <Button
                            className={`${classes.socialButton} ${classes.facebookButton}`}
                            startIcon={<Facebook/>}
                            onClick={() => handleLoginSocial('Facebook')}>
                            Facebook
                        </Button>
                    
                    
                        <Button
                            className={`${classes.socialButton} ${classes.linkedinButton}`}
                            startIcon={<LinkedIn/>}
                            onClick={() => handleLoginSocial('linkedin')}>
                            LinkedIn
                        </Button>
                    
                </Grid>
            </Grid>            
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}