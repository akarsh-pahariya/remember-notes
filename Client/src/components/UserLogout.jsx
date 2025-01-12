import axios from 'axios';
import { backendBaseURL } from '../services/constants';
import { removeUserData } from '../store/slices/userSlice';
import { clearNotes } from '../store/slices/notesSlice';
import { removeSelectedNote } from '../store/slices/selectedNoteSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      const res = await axios.get(`${backendBaseURL}/user/logout`, {
        withCredentials: true,
      });
      window.alert(res.data.message);
      dispatch(removeUserData());
      dispatch(clearNotes());
      dispatch(removeSelectedNote());
      navigate('/login');
    } catch (err) {
      window.alert('Logout failed, Please try again');
      console.log(err);
    }
  };

  return (
    <button
      onClick={logoutUser}
      className="w-full py-3 bg-red-600 text-white text-lg rounded-md hover:bg-red-500 transition duration-200"
    >
      Logout
    </button>
  );
};

export default UserLogout;
