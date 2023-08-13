
import { AccountCircle } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";



const UserProfile = () => {
    const userLogged = useSelector((state:any) => state.userLoggedState);

    let userName = userLogged.logged?userLogged.given_name : 'Anonimous';


    return (
        <>
            <AccountCircle fontSize="large" />                    
            <Typography variant="caption">{userName}</Typography>
        </>
    );
  };
  
  export default UserProfile;

  