/* eslint-disable react/prop-types */
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';

const UsernameInput = ({ name, onNameChange }) => {
  const nameRef = useRef(null);

  const handleFocus = () => {
    nameRef.current.focus();
  };

  const handleChange = (e) => {
    onNameChange(e.target.value);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <label htmlFor="username" className="text-lg font-medium text-gray-300">
          Username
        </label>
        <button
          onClick={handleFocus}
          className="text-gray-400 hover:text-white transition duration-200"
          title="Update Username"
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
      </div>
      <input
        id="username"
        value={name ?? ''}
        ref={nameRef}
        onChange={handleChange}
        type="text"
        className="w-full px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
};

export default UsernameInput;
