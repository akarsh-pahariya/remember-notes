import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import notesReducer from './slices/notesSlice';
import selectedNoteReducer from './slices/selectedNoteSlice';
import filterReducer from './slices/filtersSlice';

const appStore = configureStore({
  reducer: {
    user: userReducer,
    notes: notesReducer,
    selectedNote: selectedNoteReducer,
    filters: filterReducer,
  },
});

export default appStore;
