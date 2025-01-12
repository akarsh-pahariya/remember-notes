import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addUserData } from '../store/slices/userSlice';
import { backendBaseURL } from '../services/constants';
import { useEffect } from 'react';

const useIncludeUser = () => {
  const userInfo = useSelector((store) => store.user.infoAvailable);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!userInfo) {
        try {
          const res = await axios.get(`${backendBaseURL}/user/info`, {
            withCredentials: true,
          });
          dispatch(addUserData(res.data.userData));
        } catch (error) {
          console.error('Failed to fetch user info:', error);
        }
      }
    };

    fetchUserInfo();
  }, [userInfo, dispatch]);
};

export default useIncludeUser;
