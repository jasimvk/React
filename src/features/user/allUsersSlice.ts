import { createSlice } from "@reduxjs/toolkit";

export interface AllUsersState {
  allUsers: Person[];
}
type Person = {
  id: number;
  userName: string;
  password: string;
  active: boolean;
  userType: string;
  createDate: string;
  activationDate: string;
  deActivationDate: string;
  updatedDate: string;
};
const initialState: AllUsersState = {
  allUsers: [
    {
      id: 1,
      userName: "Ali",
      password: "Ali@1234",
      active: true,
      userType: "admin",
      createDate: "",
      activationDate: "",
      deActivationDate: "",
      updatedDate: "",
    },
    {
      id: 2,
      userName: "Jasim",
      password: "123456",
      active: true,
      userType: "user",
      createDate: "",
      activationDate: "",
      deActivationDate: "",
      updatedDate: "",
    },
  ],
};

export const allUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    addNewUser: (state, action) => {
      state.allUsers = action.payload
    },
  },
});

export const { addNewUser } = allUsersSlice.actions;
export default allUsersSlice.reducer;
