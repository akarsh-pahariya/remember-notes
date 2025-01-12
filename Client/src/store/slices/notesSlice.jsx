import { createSlice } from '@reduxjs/toolkit';

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
  },
  reducers: {
    addNotes: (state, action) => {
      state.notes = action.payload;
    },
    clearNotes: (state) => {
      state.notes = [];
    },
  },
});

export const { addNotes, clearNotes } = notesSlice.actions;
export default notesSlice.reducer;
