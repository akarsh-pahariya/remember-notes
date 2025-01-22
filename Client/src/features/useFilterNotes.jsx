import { useDispatch, useSelector } from 'react-redux';
import { backendBaseURL } from '../services/constants';
import axios from 'axios';
import { addNotes } from '../store/slices/notesSlice';

const useFilterNotes = () => {
  const sort = useSelector((store) => store.filters.sort);
  const dispatch = useDispatch();

  const fetchFilteredData = async () => {
    try {
      console.log('I am here');
      const res = await axios.get(`${backendBaseURL}/note?sort=${sort}`, {
        withCredentials: true,
        headers: {
          userInfoRequired: false,
        },
      });
      dispatch(addNotes(res.data.data.note));
    } catch (error) {
      window.alert('Unable to fetch the desired results from the backend');
      console.log(error);
    }
  };

  return fetchFilteredData;
};

export default useFilterNotes;
