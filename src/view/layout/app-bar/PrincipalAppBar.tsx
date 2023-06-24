import * as React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LoginDialog from '@/view/screens/dialogs/identification/LogingDialog';
import { useSelector, useDispatch } from 'react-redux';
import { AccountCircle } from '@mui/icons-material';
import { Box, Menu, MenuItem } from '@mui/material';
import UserProfile from '@/view/components/profile/UserProfile';
import userSession from '@/domain/session/UserSession';

import { verifyUserLogged } from '@/store/reducers/UserLoggedState';
import { openDialogLogin} from '@/store/reducers/dialogs/LoginState';
import { useRouter } from 'next/router';
import { HttpStatusCode } from 'axios';
import verifyRequiredLogin from '@/actions/VerifyRequireLogin';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function PrincipalAppBar() {
  
  
  const router = useRouter();
  
  const userLogged = useSelector((state:any) => state.userLoggedState);
  const dispatch = useDispatch();
  const [openLoginDialog, setOpenLoginDialog] = React.useState(false);
  const [logged, setLogged] = React.useState(false);


  const menuId = 'primary-search-account-menu';
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };


  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleProfile = () => {
     userSession.session().then(async (body)=>{
      await console.log('Sessão :', body);
      verifyRequiredLogin(router,body);
      
    });

  };


  useEffect(() => {
    setLogged(userLogged.logged)
  }, [userLogged.logged])

  const handleLogout = () => {
    userSession.logout().then((response)=>{      
      setAnchorEl(null);
      handleMobileMenuClose();
      dispatch(verifyUserLogged());  
    });
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfile}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const handleOpenLogin = () => {
    dispatch(openDialogLogin());    
  };



  return (
    <>     
      <HideOnScroll >
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {logged ? 
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"   
                  aria-controls={menuId}               
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <UserProfile />
                </IconButton>
              </Box>
          :                    
            <Button color="inherit" onClick={handleOpenLogin}>Login</Button> 
          }    
        {renderMenu}  
          
        </Toolbar>
        
      </AppBar>
        
      </HideOnScroll>   
    </>
  );
}