
import { IndentificationScreenType } from '@/view/screens/dialogs/identification/IdentificationDialog';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IDialogWindow = { open: false};

const loginDialogSlice = createSlice({
  name: 'loginDialog',
  initialState,
  reducers: {
    openDialogLogin: (state) =>  {
      return { open: true, 
               screenType: IndentificationScreenType.LOGIN};
    },
    openDialogNewAccount: (state) =>  {
      return { open: true, 
               screenType: IndentificationScreenType.NEWACCOUNT};
    },
    openDialogEmailAccountConfirmed: (state, data) => {
      const {key} = data.payload;
      return { open: true, 
        
        screenType: IndentificationScreenType.CONFIRMACCOUNT,
        key
      };
    },
    closeDialogLogin: (state) =>  {
        return { open: false};
    },
  }
});

export const { openDialogLogin, closeDialogLogin, openDialogNewAccount, openDialogEmailAccountConfirmed} = loginDialogSlice.actions;

export default loginDialogSlice.reducer;