import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeSelectedNote } from '../store/slices/selectedNoteSlice';
import axios from 'axios';
import { backendBaseURL } from '../services/constants';

const CreateNote = ({ fetchNotes }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [importance, setImportance] = useState('');
  const selectedNote = useSelector((store) => store.selectedNote.selectedNote);
  const updateNote = useSelector((store) => store.selectedNote.updateNote);
  const dispatch = useDispatch();

  useEffect(() => {
    if (updateNote === true) {
      setTitle(selectedNote.title);
      setDescription(selectedNote.description);
      setImportance(selectedNote.importance);
    } else {
      setTitle('');
      setDescription('');
      setImportance(5);
    }
  }, [updateNote, selectedNote]);

  const createNote = async () => {
    try {
      const res = await axios.post(
        `${backendBaseURL}/note`,
        { title, description, importance },
        { withCredentials: true }
      );
      if (res.data.status === 'Success')
        window.alert('Note has been added sucessfully !!');
      dispatch(removeSelectedNote());
      fetchNotes();
    } catch (error) {
      window.alert(error.response.data.message);
      console.log(error);
    }
  };

  const updateExistingNote = async () => {
    try {
      const res = await axios.post(
        `${backendBaseURL}/note/${selectedNote._id}`,
        { title, description, importance },
        { withCredentials: true }
      );
      if (res.data.status === 'Success')
        window.alert('Note has been updated sucessfully !!');
      dispatch(removeSelectedNote());
      fetchNotes();
    } catch (error) {
      window.alert(error.response.data.message);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (updateNote === true) updateExistingNote();
    else createNote();
  };

  return (
    <div className="w-1/2 bg-gray-900 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-white">Create New Note</h2>
        <button
          onClick={() => dispatch(removeSelectedNote())}
          className="border-2 border-gray-700 text-gray-300 px-4 py-1 rounded-md hover:bg-gray-700 hover:text-white transition duration-200"
        >
          Clear
        </button>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-300"
          >
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter note title"
            className="w-full border border-gray-700 rounded-md px-4 py-2 mt-1 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300"
          >
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            placeholder="Enter note description"
            className="w-full border border-gray-700 rounded-md px-4 py-2 mt-1 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="importance"
            className="block text-sm font-medium text-gray-300"
          >
            Importance
          </label>
          <input
            value={importance}
            onChange={(e) => setImportance(e.target.value)}
            type="range"
            min="1"
            max="10"
            className="w-full mt-1"
          />
          <div className="text-sm text-gray-400 text-right">
            Value: {importance}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {updateNote ? 'Update Note' : 'Add Note'}
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
