import { useRef } from 'react';
import axios from 'axios';
import { backendBaseURL } from '../services/constants';
import useFetchUser from '../features/useFetchUser';
import { showErrorToast, showSuccessToast } from '../services/toastServices';

const ForgotPassword = () => {
  const email = useRef(null);
  useFetchUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${backendBaseURL}/user/forgotPassword`, {
        email: email.current.value,
      });
      showSuccessToast(res.data.message);
    } catch (error) {
      window.alert(error.response.data.message);
      showErrorToast(error);
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center">
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center text-white mb-4">
          Forgot Password
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Enter your email address:
            </label>
            <input
              id="email"
              type="email"
              ref={email}
              required
              className="border-2 border-gray-600 rounded-md mt-1 p-2 w-full bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex justify-center">
            <button className="w-full border-2 border-blue-500 rounded-md text-white px-4 py-2 bg-blue-500 hover:bg-blue-600 font-medium">
              Get Verification Email
            </button>
          </div>
        </form>
      </div>
      <p className="mt-4 text-center text-red-500 text-sm">
        *I am using Mailtrap as the email service, so you will not receive a
        password change email.
      </p>
    </div>
  );
};

export default ForgotPassword;
