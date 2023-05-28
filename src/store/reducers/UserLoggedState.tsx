import userSession from '@/domain/session/UserSession';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IUserLogged = {logged:false};

const userLoggedSlice = createSlice({
  name: 'userLogged',
  initialState,
  reducers: {
    verifyUserLogged: (state) =>  {
      return userSession.isLogged();
    },
    logoutUser: () => initialState,
  }
});

export const { verifyUserLogged, logoutUser } = userLoggedSlice.actions;

export default userLoggedSlice.reducer;