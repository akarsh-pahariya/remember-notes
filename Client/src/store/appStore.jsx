import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import notesReducer from './slices/notesSlice';
import selectedNoteReducer from './slices/selectedNoteSlice';

const appStore = configureStore({
  reducer: {
    user: userReducer,
    notes: notesReducer,
    selectedNote: selectedNoteReducer,
  },
});

export default appStore;
