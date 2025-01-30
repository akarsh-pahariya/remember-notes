import axios from 'axios';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { backendBaseURL } from '../services/constants';
import useFetchUser from '../features/useFetchUser';
import { showErrorToast, showSuccessToast } from '../services/toastServices';

const ResetPassword = () => {
  const navigate = useNavigate();
  const password = useRef(null);
  const confirmPassword = useRef(null);
  const params = useParams();
  useFetchUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${backendBaseURL}/user/resetPassword`, {
        password: password.current.value,
        confirmPassword: confirmPassword.current.value,
        passwordResetToken: params.resetToken,
      });

      showSuccessToast(res.data.message);
      navigate('/login');
    } catch (error) {
      showErrorToast(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center">
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center text-white mb-4">
          Reset Password
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              New Password:
            </label>
            <input
              ref={password}
              id="password"
              type="password"
              required
              className="border-2 border-gray-600 rounded-md p-2 w-full bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-300"
            >
              Confirm Password:
            </label>
            <input
              ref={confirmPassword}
              id="confirm-password"
              type="password"
              required
              className="border-2 border-gray-600 rounded-md p-2 w-full bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex justify-center">
            <button className="w-full border-2 border-blue-500 rounded-md text-white px-4 py-2 bg-blue-500 hover:bg-blue-600 font-medium">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
