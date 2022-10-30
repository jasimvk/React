import { createSlice } from '@reduxjs/toolkit';

export interface authState {
  isLoggedIn: boolean;
} 
const initialState: authState = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'loggedIn',
  initialState,
  reducers: {
    loggedIn: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
    loggedOut: (state) => {
        state.isLoggedIn = !state.isLoggedIn;
      },
  },
});

export const { loggedIn, loggedOut } = authSlice.actions;
 

export default authSlice.reducer;
