import { createSlice } from '@reduxjs/toolkit';

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    totalNotes: 0,
  },
  reducers: {
    addNotes: (state, action) => {
      state.notes = action.payload;
    },
    addTotalNotes: (state, action) => {
      state.totalNotes = action.payload;
    },
    clearNotes: (state) => {
      state.notes = [];
    },
  },
});

export const { addNotes, clearNotes, addTotalNotes } = notesSlice.actions;
export default notesSlice.reducer;
