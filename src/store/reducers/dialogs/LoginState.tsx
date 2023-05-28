
import { createSlice } from '@reduxjs/toolkit';

const initialState: IDialogWindow = { open: false};

const loginDialogSlice = createSlice({
  name: 'loginDialog',
  initialState,
  reducers: {
    openDialogLogin: (state) =>  {
      return { open: true};
    },
    closeDialogLogin: (state) =>  {
        return { open: false};
    },
  }
});

export const { openDialogLogin, closeDialogLogin} = loginDialogSlice.actions;

export default loginDialogSlice.reducer;