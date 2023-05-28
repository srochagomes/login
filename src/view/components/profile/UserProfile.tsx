import { Typography } from "@material-ui/core";
import { AccountCircle } from "@mui/icons-material";
import { useSelector } from "react-redux";



const UserProfile = () => {
    const userLogged = useSelector((state:any) => state.userLoggedState);

    let userName = userLogged.logged?userLogged.preferred_username : 'Anonimous';


    return (
        <>
            <AccountCircle fontSize="large" />                    
            <Typography variant="caption">{userName}</Typography>
        </>
    );
  };
  
  export default UserProfile;