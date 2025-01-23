import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    filters: [],
    sort: '-createdAt',
    page: 1,
  },
  reducers: {
    updateSort: (state, action) => {
      state.sort = action.payload;
    },
    updatePage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { updateSort, updatePage } = filtersSlice.actions;
export default filtersSlice.reducer;
