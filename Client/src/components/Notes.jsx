import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import {
  addSelectedNote,
  removeSelectedNote,
} from '../store/slices/selectedNoteSlice';
import axios from 'axios';
import { backendBaseURL } from '../services/constants';
import { showErrorToast, showSuccessToast } from '../services/toastServices';

const Notes = (noteData) => {
  const dispatch = useDispatch();

  const updateNote = () => {
    dispatch(addSelectedNote(noteData.data));
  };

  const deleteNote = async () => {
    try {
      await axios.delete(`${backendBaseURL}/note/${noteData.data._id}`, {
        withCredentials: true,
      });
      showSuccessToast('Note has been deleted successfully !!');
      dispatch(removeSelectedNote());
      noteData.fetchData();
    } catch (error) {
      showErrorToast('Note Deletion has failed, Please try again !!');
      console.log(error);
    }
  };

  return (
    <div className="space-y-4 mb-4">
      <div className="p-6 border border-gray-700 rounded-lg shadow-lg bg-gray-800">
        <h3 className="font-bold text-lg text-gray-100 mb-2">
          {noteData.data.title}
        </h3>
        <p className="text-sm text-gray-300 mb-4">
          {noteData.data.description}
        </p>
        <div className="text-xs text-gray-400 space-y-1">
          <p>
            <i>
              <b>Importance: </b>
            </i>
            <span className="font-semibold">{noteData.data.importance}</span>
          </p>
          <p>
            <span className="font-semibold">Created At:</span>{' '}
            {noteData.data.createdAt}
          </p>
          <p>
            <span className="font-semibold">Updated At:</span>{' '}
            {noteData.data.updatedAt}
          </p>
        </div>
        <div className="mt-4 flex">
          <button
            onClick={updateNote}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-md shadow-md focus:outline-none focus:ring focus:ring-blue-400 mr-4"
          >
            Update
            <FontAwesomeIcon icon={faPenToSquare} className="ml-2" />
          </button>
          <button
            onClick={deleteNote}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-medium rounded-md shadow-md focus:outline-none focus:ring focus:ring-blue-400"
          >
            Delete
            <FontAwesomeIcon icon={faTrashCan} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notes;
