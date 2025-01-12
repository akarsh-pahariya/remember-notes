import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: {},
    infoAvailable: false,
  },
  reducers: {
    addUserData: (state, action) => {
      state.userData = action.payload;
      state.infoAvailable = true;
    },
    removeUserData: (state) => {
      state.userData = {};
      state.infoAvailable = false;
    },
  },
});

export const { addUserData, removeUserData } = userSlice.actions;
export default userSlice.reducer;
