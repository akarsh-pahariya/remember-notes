import { createSlice } from '@reduxjs/toolkit';

const selectedNoteSlice = createSlice({
  name: 'selectedNote',
  initialState: {
    selectedNote: {},
    updateNote: false,
  },
  reducers: {
    addSelectedNote: (state, action) => {
      state.selectedNote = action.payload;
      state.updateNote = true;
    },
    removeSelectedNote: (state) => {
      state.selectedNote = {};
      state.updateNote = false;
    },
  },
});

export const { addSelectedNote, removeSelectedNote } =
  selectedNoteSlice.actions;
export default selectedNoteSlice.reducer;
