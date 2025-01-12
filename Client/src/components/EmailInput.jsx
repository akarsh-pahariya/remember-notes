/* eslint-disable react/prop-types */
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';

const EmailInput = ({ email, onEmailChange }) => {
  const emailRef = useRef(null);

  const handleFocus = () => {
    emailRef.current.focus();
  };

  const handleChange = (e) => {
    onEmailChange(e.target.value);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <label htmlFor="email" className="text-lg font-medium text-gray-300">
          Email
        </label>
        <button
          onClick={handleFocus}
          className="text-gray-400 hover:text-white transition duration-200"
          title="Update Email"
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
      </div>
      <input
        id="email"
        value={email ?? ''}
        ref={emailRef}
        onChange={handleChange}
        type="email"
        className="w-full px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
};

export default EmailInput;
