import { useDispatch, useSelector } from 'react-redux';
import { backendBaseURL, backendURL } from '../services/constants';
import axios from 'axios';
import { addUserData } from '../store/slices/userSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useFetchUser = () => {
  const infoAvailable = useSelector((store) => store.user.infoAvailable);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      if (infoAvailable) {
        navigate('/');
      } else {
        const res = await axios.get(`${backendBaseURL}/user/authenticate`, {
          withCredentials: true,
          headers: {
            userInfoRequired: true,
          },
        });
        res.data.user.photoAddress = res.data.user.photo;
        const img = await axios.get(`${backendURL}/${res.data.user.photo}`, {
          responseType: 'blob',
        });
        const imageUrl = URL.createObjectURL(img.data);
        res.data.user.photoUrl = imageUrl;
        delete res.data.user.photo;
        if (res.data.user) {
          dispatch(addUserData(res.data.user));
          navigate('/');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return infoAvailable;
};

export default useFetchUser;
