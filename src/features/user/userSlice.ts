import { createSlice } from "@reduxjs/toolkit";
// import { RootState, AppThunk } from '../../app/store';

export interface UserState {
  currentUser: Person | undefined;
  status: "idle" | "loading" | "failed";
}
export type Person = {
  userName: string;
  password: string;
  active?: boolean;
  userType?: string;
  createDate?: string;
  activationDate?: string;
  deActivationDate?: string;
  updatedDate?: string;
};
const initialState: UserState = {
  currentUser: { userName: "", password: "" },
  status: "idle",
};

export const userSlice = createSlice({
  name: "currentUser",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { addCurrentUser } = userSlice.actions;

// export const selectCount = (state: RootState) => state.counter.value;

export default userSlice.reducer;
