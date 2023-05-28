import { configureStore } from '@reduxjs/toolkit';
import userLoggedSlice from '@/store/reducers/UserLoggedState'
import loginDialogSlice from '@/store/reducers/dialogs/LoginState'


const storePrincipal = configureStore({
    reducer: {
      userLoggedState: userLoggedSlice,
      loginDialogState: loginDialogSlice
    }
  });
  
  export default storePrincipal;