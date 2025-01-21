import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { backendBaseURL } from '../services/constants';
import axios from 'axios';

const useFilterNotes = () => {
  const sort = useSelector((store) => store.filters.sort);
  const filters = useSelector((store) => store.filters.filters);
  const dispatch = useDispatch();

  const fetchFilteredData = async () => {
    try {
      const res = await axios.get(`${backendBaseURL}/note?sort=${sort}`, {
        withCredentials: true,
        headers: {
          userInfoRequired: false,
        },
      });
    } catch (error) {
      window.alert('Unable to make fetch the desired results from the backend');
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFilteredData();
  }, [sort, filters, dispatch]);
};

export default useFilterNotes;
