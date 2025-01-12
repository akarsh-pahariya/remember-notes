import { useDispatch, useSelector } from 'react-redux';
import { backendBaseURL, backendURL } from '../services/constants';
import axios from 'axios';
import { addUserData } from '../store/slices/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useUserInfo from '../features/useUserInfo';
import UsernameInput from '../components/UsernameInput';
import EmailInput from '../components/EmailInput';
import UserLogout from '../components/UserLogout';

const User = () => {
  const userData = useSelector((store) => store.user.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfoRequired = useUserInfo();
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [photoAddress, setPhotoAddress] = useState(null);

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const fetchUserInfo = userInfoRequired;
        if (fetchUserInfo === true) {
          const res = await axios.get(`${backendBaseURL}/user/authenticate`, {
            withCredentials: true,
            headers: {
              userInfoRequired: fetchUserInfo.toString(),
            },
          });
          res.data.user.photoAddress = res.data.user.photo;
          const img = await axios.get(`${backendURL}/${res.data.user.photo}`, {
            responseType: 'blob',
          });
          const imageUrl = URL.createObjectURL(img.data);
          res.data.user.photoUrl = imageUrl;
          delete res.data.user.photo;
          if (res.data.user !== 0) dispatch(addUserData(res.data.user));
        }
      } catch (error) {
        window.alert(
          'You are not logged in. Please login to get access to this route'
        );
        console.log(error);
        navigate('/login');
      }
    };
    authenticateUser();
  }, []);

  useEffect(() => {
    setHookVariables();
  }, [userData]);

  const setHookVariables = () => {
    setName(userData.name);
    setEmail(userData.email);
    setPhotoUrl(userData.photoUrl);
    setPhotoAddress(userData.photoAddress);
  };

  const handleEmailChange = (val) => {
    setEmail(val);
  };

  const handleNameChange = (val) => {
    setName(val);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoAddress(file);
      const previewUrl = URL.createObjectURL(file);
      setPhotoUrl(previewUrl);
    }
  };

  const updateUserInfo = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('photo', photoAddress);
      const res = await axios.post(`${backendBaseURL}/user/update`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      res.data.user.photoAddress = res.data.user.photo;
      const img = await axios.get(`${backendURL}/${res.data.user.photo}`, {
        responseType: 'blob',
      });
      const imageUrl = URL.createObjectURL(img.data);
      res.data.user.photoUrl = imageUrl;
      delete res.data.user.photo;
      dispatch(addUserData(res.data.user));
      window.alert(
        'User info updated successfully !! Reload the page to see the changes into your profile'
      );
    } catch (error) {
      window.alert(error.response?.data?.message || 'An error occurred');
      setHookVariables();
      console.log(error);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-gray-950 p-8">
      <div className="bg-gray-900 shadow-xl rounded-lg p-8 flex max-w-xl w-full">
        <div className="w-2/3 pr-6">
          <UsernameInput name={name} onNameChange={handleNameChange} />
          <EmailInput email={email} onEmailChange={handleEmailChange} />
          <div className="flex items-center gap-4">
            <button
              onClick={updateUserInfo}
              className="w-full py-3 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-500 transition duration-200"
            >
              Update
            </button>

            <UserLogout />
          </div>
        </div>
        <div className="w-1/3 flex flex-col items-center justify-center">
          <div className="relative group">
            <img
              src={photoUrl}
              alt="User Avatar"
              className="rounded-full w-32 h-32 object-cover shadow-lg border-2 border-gray-800"
            />
            <label
              htmlFor="fileUpload"
              className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-full p-2 shadow-md cursor-pointer transition duration-200 group-hover:scale-110"
            >
              <FontAwesomeIcon icon={faUpload} className="text-lg" />
            </label>
            <input
              type="file"
              onChange={handlePhotoChange}
              id="fileUpload"
              className="hidden"
            />
          </div>
          <p className="mt-4 text-gray-400 text-sm text-center">
            Click the icon to upload a new image
          </p>
        </div>
      </div>
    </div>
  );
};

export default User;
