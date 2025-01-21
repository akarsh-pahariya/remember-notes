import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    filters: [],
    sort: '-createdAt',
  },
  reducers: {
    updateSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const { updateSort } = filtersSlice.actions;
export default filtersSlice.reducer;
