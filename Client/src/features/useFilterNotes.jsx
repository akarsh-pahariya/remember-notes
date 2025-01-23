import { useDispatch, useSelector } from 'react-redux';
import { backendBaseURL } from '../services/constants';
import axios from 'axios';
import { addNotes } from '../store/slices/notesSlice';
import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

const useFilterNotes = () => {
  const sort = useSelector((store) => store.filters.sort);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const fetchFilteredData = useCallback(async () => {
    console.log('useFilterNotes');
    const page = parseInt(searchParams.get('page'));
    if (!page) return;

    try {
      const url = `${backendBaseURL}/note?sort=${sort}&page=${page}`;
      const res = await axios.get(url, {
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
  }, [sort, searchParams, dispatch]);

  return fetchFilteredData;
};

export default useFilterNotes;
