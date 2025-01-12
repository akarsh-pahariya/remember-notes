import axios from 'axios';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUserData } from '../store/slices/userSlice';
import { backendBaseURL, backendURL } from '../services/constants';
import useFetchUser from '../features/useFetchUser';

const SignUp = () => {
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useFetchUser();

  const handleClick = async () => {
    const url = `${backendBaseURL}/user`;
    try {
      const res = await axios.post(
        url,
        {
          name: name.current.value,
          email: email.current.value,
          password: password.current.value,
          confirmPassword: confirmPassword.current.value,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      if (res.data.status === 'Success') {
        res.data.user.photoAddress = res.data.user.photo;
        const img = await axios.get(`${backendURL}/${res.data.user.photo}`, {
          responseType: 'blob',
        });
        const imageUrl = URL.createObjectURL(img.data);
        res.data.user.photoUrl = imageUrl;
        delete res.data.user.photo;
        dispatch(addUserData(res.data.user));
        navigate('/');
      }
    } catch (error) {
      window.alert(error.response.data.message);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center">
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center text-white mb-4">
          Sign Up
        </h1>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              Name:
            </label>
            <input
              id="name"
              type="text"
              ref={name}
              required
              className="border-2 border-gray-600 rounded-md p-2 w-full bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              ref={email}
              required
              className="border-2 border-gray-600 rounded-md p-2 w-full bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password:
            </label>
            <input
              id="password"
              type="password"
              ref={password}
              required
              className="border-2 border-gray-600 rounded-md p-2 w-full bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-300"
            >
              Confirm Password:
            </label>
            <input
              id="confirmPassword"
              type="password"
              ref={confirmPassword}
              required
              className="border-2 border-gray-600 rounded-md p-2 w-full bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleClick}
              className="w-full border-2 border-blue-500 rounded-md text-white px-4 py-2 bg-blue-500 hover:bg-blue-600 font-medium"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={() => navigate('/login')}
            className="text-sm text-blue-400 hover:underline"
          >
            Already have an account? Login here
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
