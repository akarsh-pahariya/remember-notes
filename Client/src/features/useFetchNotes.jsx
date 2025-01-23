import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { backendBaseURL, backendURL } from '../services/constants';
import { addUserData } from '../store/slices/userSlice';
import { addNotes, addTotalNotes } from '../store/slices/notesSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { formatDate } from '../services/utils';

const useFetchNotes = () => {
  let userInfo = useSelector((store) => store.user.infoAvailable);
  const sort = useSelector((store) => store.filters.sort);
  const [searchParams] = useSearchParams();
  const [notes, setNotes] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  userInfo = !userInfo;

  const fetchData = async () => {
    const page = parseInt(searchParams.get('page') || 1);

    try {
      const res = await axios.get(
        `${backendBaseURL}/note?sort=${sort}&page=${page}`,
        {
          withCredentials: true,
          headers: {
            userInfoRequired: userInfo.toString(),
          },
        }
      );
      if (res.data.user !== 0) {
        res.data.user.photoAddress = res.data.user.photo;
        const img = await axios.get(`${backendURL}/${res.data.user.photo}`, {
          responseType: 'blob',
        });
        const imageUrl = URL.createObjectURL(img.data);
        res.data.user.photoUrl = imageUrl;
        delete res.data.user.photo;
        dispatch(addUserData(res.data.user));
      }

      if (res.data.data.note.length > 0) {
        res.data.data.note[0].createdAt = formatDate(
          res.data.data.note[0].createdAt
        );
        res.data.data.note[0].updatedAt = formatDate(
          res.data.data.note[0].updatedAt
        );
      }

      dispatch(addNotes(res.data.data.note));
      dispatch(addTotalNotes(res.data.data.totalNotes));
      setNotes(res.data.data.note);
    } catch (error) {
      window.alert(
        'You are not logged in. Please login to get access to this route'
      );
      console.log(error);
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { notes, fetchData };
};

export default useFetchNotes;
